import { useState } from 'react';
import { getTopMatches } from '../utils/scoring';
import QuestionnaireCard from './QuestionnaireCard';

export default function Questionnaire() {
    const [formData, setFormData] = useState({
        continent: '',
        climate: '',
        price: '',
        environment: [],
        activities: [],
        season: [],
        pace: ''
    });
    const [answers, setAnswers] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSingleSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleMultiSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.continent) {
            alert('Please select a continent preference.');
            return;
        }
        if (!formData.price) {
            alert('Please select a price level.');
            return;
        }
        
        setLoading(true);
        
        // Set answers
        setAnswers(formData);
        
        try {
            // Try multiple paths for vacations.json
            let allDestinations = null;
            const paths = [
                '/p17/data/vacations.json',
                '/data/vacations.json',
                '/vacations.json'
            ];
            
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        allDestinations = await response.json();
                        break;
                    }
                } catch (err) {
                    // Continue to next path
                }
            }
            
            if (!allDestinations) {
                throw new Error('Failed to load vacations data from any path');
            }
            
            const topMatches = getTopMatches(formData, allDestinations);
            setResults(topMatches);
        } catch (error) {
            console.error('Error loading vacations:', error);
            alert('Failed to load vacation data. Please ensure vacations.json is in public/data/vacations.json');
        } finally {
            setLoading(false);
        }
    };

    const handleTryAgain = () => {
        setAnswers(null);
        setResults(null);
        setFormData({
            continent: '',
            climate: '',
            price: '',
            environment: [],
            activities: [],
            season: [],
            pace: ''
        });
    };

    // Show results if available
    if (results !== null) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h1 className="mb-4">Your Top 3 Destinations</h1>
                        {results.length === 0 ? (
                            <div className="alert alert-warning text-center" role="alert">
                                <h2 className="h4 mb-3">No matches found</h2>
                                <p>We couldn't find any destinations matching your selected continent and price level. Please try different preferences.</p>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary btn-lg mt-3"
                                    onClick={handleTryAgain}
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="row">
                                    {results.map((dest, index) => (
                                        <div key={dest.id || index} className="col-md-4 mb-4">
                                            <QuestionnaireCard destination={dest} />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center mt-4">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary btn-lg"
                                        onClick={handleTryAgain}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Finding your perfect destinations...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show questionnaire form
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <style>{`
                        .form-check {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            justify-content: center;
                            padding-left: 0;
                        }
                        .form-check-input {
                            margin: 0;
                            position: relative;
                        }
                        .form-check-label {
                            margin-bottom: 0;
                        }
                    `}</style>
                    <h1 className="mb-4 mt-5">Travel Preferences Questionnaire</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Question 1: Continent */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">1. Which continent do you prefer?</h2>
                            <div>
                                {['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania', 'No Preference'].map(continent => (
                                    <div key={continent} className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="continent"
                                            id={`continent-${continent}`}
                                            value={continent}
                                            checked={formData.continent === continent}
                                            onChange={(e) => handleSingleSelect('continent', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`continent-${continent}`}>
                                            {continent}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 2: Climate Preference */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">2. Climate Preference</h2>
                            <div>
                                {['Hot', 'Warm', 'Mild', 'Cold', 'Snowy'].map(climate => (
                                    <div key={climate} className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="climate"
                                            id={`climate-${climate}`}
                                            value={climate}
                                            checked={formData.climate === climate}
                                            onChange={(e) => handleSingleSelect('climate', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`climate-${climate}`}>
                                            {climate}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 3: Price Level */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">3. Price Level</h2>
                            <div>
                                {['Cheap', 'Medium', 'Expensive', 'Luxury'].map(price => (
                                    <div key={price} className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id={`price-${price}`}
                                            value={price}
                                            checked={formData.price === price}
                                            onChange={(e) => handleSingleSelect('price', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`price-${price}`}>
                                            {price}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 4: Environment Preference (Multi-select) */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">4. Environment Preference (Select all that apply)</h2>
                            <div className="row">
                                {['Beach', 'City', 'Island', 'Mountains', 'Forest', 'Countryside', 'Desert', 'Lakes', 'Coastal', 'River', 'Savannah', 'Hills', 'Nature'].map(env => (
                                    <div key={env} className="col-md-4 col-sm-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`env-${env}`}
                                                value={env}
                                                checked={formData.environment.includes(env)}
                                                onChange={(e) => handleMultiSelect('environment', e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`env-${env}`}>
                                                {env}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 5: Activities (Multi-select) */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">5. Activities You Enjoy (Select all that apply)</h2>
                            <div className="row">
                                {['Swimming', 'Nightlife', 'Food', 'Relaxation', 'Adventure', 'Hiking', 'Wildlife', 'Photography', 'Culture', 'Historical', 'Shopping', 'Diving', 'Festivals', 'Theme Parks', 'Wine Tasting'].map(activity => (
                                    <div key={activity} className="col-md-4 col-sm-6 mb-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`activity-${activity}`}
                                                value={activity}
                                                checked={formData.activities.includes(activity)}
                                                onChange={(e) => handleMultiSelect('activities', e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`activity-${activity}`}>
                                                {activity}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 6: Preferred Season (Multi-select) */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">6. Preferred Season (Select all that apply)</h2>
                            <div>
                                {['Winter', 'Spring', 'Summer', 'Fall'].map(season => (
                                    <div key={season} className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`season-${season}`}
                                            value={season}
                                            checked={formData.season.includes(season)}
                                            onChange={(e) => handleMultiSelect('season', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`season-${season}`}>
                                            {season}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question 7: Travel Pace */}
                        <div className="mb-4">
                            <h2 className="h3 mb-3">7. Travel Pace</h2>
                            <div>
                                {['Slow', 'Balanced', 'Fast'].map(pace => (
                                    <div key={pace} className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="pace"
                                            id={`pace-${pace}`}
                                            value={pace}
                                            checked={formData.pace === pace}
                                            onChange={(e) => handleSingleSelect('pace', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`pace-${pace}`}>
                                            {pace}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg mt-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
