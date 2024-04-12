import { useEffect, useState } from 'react';

import './Workout.scss';

export default function Workout() {
    const [categories, setCategories] = useState([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState(true)
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [isLoadingWorkouts, setIsLoadingWorkouts] = useState(true)

    // fetch categories
    useEffect(() => {
        const fetchData = async () => {
            fetch('http://localhost:3001/workout_category')
                .then((response) => response.json())
                .then((data) => {
                    setCategories(data);
                    setIsLoadingCategory(false);
                })
        };
        fetchData();
    }, [])

    // fetch workouts by category
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:3001/workouts?category_id=${selectedCategoryId}`)
                .then((response) => response.json())
                .then((data) => {
                    setWorkouts(data);
                    setIsLoadingWorkouts(false);
                })
        };
        fetchData();
    }, [selectedCategoryId])

    return (
        <div className="workout">
            {
                !isLoadingCategory && // Can I use count instead of separate const
                <div className="category">
                    <button onClick={() => setSelectedCategoryId('')}>All</button>
                    { categories.map(category => <button key={category.id} onClick={() => setSelectedCategoryId(category.id)}>{category.name}</button>) }
                </div>
            }
            {
                !isLoadingWorkouts &&
                <div className="workouts">
                    { workouts.map(workout => <div key={workout.id}>{workout.name}</div>) }
                </div>
            }
        </div>
    );
}