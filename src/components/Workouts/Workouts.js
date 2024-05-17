import { useEffect, useState } from 'react';
import Stopwatch from "../Stopwatch/Stopwatch";

import './Workouts.scss';

export default function Workout() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null)

    // fetch categories
    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3001/workout_category')
                .then((response) => response.json())
                .then((data) => {
                    setCategories(data);
                })
        };
        fetchData();
    }, [])

    // fetch workouts by category
    useEffect(() => {
        let selectedCategoryId = (selectedCategory == null) ? "" : selectedCategory.id;
        const fetchData = () => {
            fetch(`http://localhost:3001/workouts?category_id=${selectedCategoryId}`)
                .then((response) => response.json())
                .then((data) => {
                    setWorkouts(data);
                })
        };
        fetchData();
    }, [selectedCategory])

    console.log(setSelectedCategory);

    return (
        <>
            {selectedWorkout === null &&
                <div className="cointainer">
                    <div className="categories__wrapper">
                        <h2 className="categories__title">Workouts</h2>
                        {
                            categories.length > 0 &&
                            <div className="categories">
                                <button
                                    className={`categories__button button ${(selectedCategory == '') ? " categories__button--active" : ""}`}
                                    onClick={() => setSelectedCategory()}>
                                    All
                                </button>
                                {
                                    categories.map((category) =>
                                        <button
                                            className={`categories__button button ${(selectedCategory == category.id) ? " categories__button--active" : ""}`}
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category)}>
                                            {category.name}
                                        </button>
                                    )
                                }
                            </div>
                        }
                    </div>
                    {
                        workouts.length > 0 &&
                        <div className="workouts__wrapper">
                            <h3 className="workout__header">Select your workout...</h3>
                            <div className="workouts">
                                {
                                    workouts.map((workout) =>
                                        <div key={workout.id} className="workouts__item">
                                            <img src={workout.image} alt={workout.name} className="item__image" />
                                            <p className="item__header">{workout.name}</p>
                                            <button className="item__button button" onClick={() => setSelectedWorkout(workout)}>Start training</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                </div>
            }
            {selectedWorkout !== null &&
                <>
                    <div>{selectedWorkout.name}</div>
                    <Stopwatch />
                </>
            }
        </>
    );
}