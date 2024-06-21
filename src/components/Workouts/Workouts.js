import { useEffect, useState } from 'react';
import Stopwatch from "../Stopwatch/Stopwatch";
import getTimeFormated from '../../utils/getTimeFormated'
import { format } from 'date-fns'

import './Workouts.scss';

export default function Workout() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:3001/category')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setCategories(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
        fetchData();
    }, [])

    useEffect(() => {
        let selectedCategoryId = (selectedCategory == null) ? "" : selectedCategory.id;
        const fetchData = () => {
            fetch(`http://localhost:3001/workouts?categoryId=${selectedCategoryId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setWorkouts(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
        fetchData();
    }, [selectedCategory])

    useEffect(() => {
        const fetchData = () => {
            fetch(`http://localhost:3001/trainings`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setTrainings(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };
        fetchData();
    }, [selectedWorkout])

    function handleReturnButtonClick() {
        setSelectedWorkout(null);
        // clear Stopwatch
    }
    return (
        <div className="container">
            {selectedWorkout === null &&
                <>
                    <div className="categories__wrapper">
                        <h2 className="categories__title">Workouts</h2>
                        {categories.length > 0 &&
                            <div className="categories">
                                <button
                                    className={`categories__button button ${(selectedCategory === '') ? " categories__button--active" : ""}`}
                                    onClick={() => setSelectedCategory()}>
                                    All
                                </button>
                                {
                                    categories.map((category) =>
                                        <button
                                            className={`categories__button button ${(selectedCategory === category.id) ? " categories__button--active" : ""}`}
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category)}>
                                            {category.name}
                                        </button>
                                    )
                                }
                            </div>
                        }
                    </div>
                    {workouts.length > 0 &&
                        <div className="workouts__wrapper">
                            <h3 className="workouts__header">Select your workout...</h3>
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
                </>
            }
            {selectedWorkout !== null &&
                <div className="workout">
                    <div className="workout__background">
                        <div className="background__wrapper">
                            <img src={selectedWorkout.image} alt={selectedWorkout.name} />
                        </div>
                        <button className="button button__back" onClick={handleReturnButtonClick}>back</button>
                        <h3 className="workout__header">
                            <span>
                                {categories.filter((category) => String(category.id) === String(selectedWorkout.categoryId))[0].name + ': '}
                            </span>
                            {selectedWorkout.name}
                        </h3>
                    </div>
                    <section className="workout__stopwatch">
                        <Stopwatch workout={selectedWorkout} returnButton={handleReturnButtonClick} />
                    </section>
                </div>
            }
            {selectedWorkout === null && trainings.length > 0 &&
                <div>
                    <h2>Trainings ({trainings.length})</h2>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Workout ID</th>
                            <th>Category ID</th>
                            <th>timeElapsedInMs</th>
                            <th>DateTime</th>
                        </tr>
                        {
                            trainings.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.id}</td>
                                    <td>{item.workoutId}</td>
                                    <td>{item.categoryId}</td>
                                    <td>{getTimeFormated(item.timeElapsedInMs)}</td>
                                    <td>{format(item.timestamp, 'yyyy-MM-dd HH:mm')}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>

            }
        </div>
    );
}