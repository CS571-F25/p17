import { useState } from 'react';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1>Travel Preferences Questionnaire</h1>
            <form onSubmit={handleSubmit}>
                {/* Question 1: Continent */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>1. Which continent do you prefer?</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania', 'No Preference'].map(continent => (
                            <label key={continent} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="continent"
                                    value={continent}
                                    checked={formData.continent === continent}
                                    onChange={(e) => handleSingleSelect('continent', e.target.value)}
                                />
                                <span>{continent}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 2: Climate Preference */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>2. Climate Preference</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Hot', 'Warm', 'Mild', 'Cold', 'Snowy'].map(climate => (
                            <label key={climate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="climate"
                                    value={climate}
                                    checked={formData.climate === climate}
                                    onChange={(e) => handleSingleSelect('climate', e.target.value)}
                                />
                                <span>{climate}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 3: Price Level */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>3. Price Level</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Cheap', 'Medium', 'Expensive', 'Luxury'].map(price => (
                            <label key={price} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="price"
                                    value={price}
                                    checked={formData.price === price}
                                    onChange={(e) => handleSingleSelect('price', e.target.value)}
                                />
                                <span>{price}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 4: Environment Preference (Multi-select) */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>4. Environment Preference (Select all that apply)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                        {['Beach', 'City', 'Island', 'Mountains', 'Forest', 'Countryside', 'Desert', 'Lakes', 'Coastal', 'River', 'Savannah', 'Hills', 'Nature'].map(env => (
                            <label key={env} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    value={env}
                                    checked={formData.environment.includes(env)}
                                    onChange={(e) => handleMultiSelect('environment', e.target.value)}
                                />
                                <span>{env}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 5: Activities (Multi-select) */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>5. Activities You Enjoy (Select all that apply)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                        {['Swimming', 'Nightlife', 'Food', 'Relaxation', 'Adventure', 'Hiking', 'Wildlife', 'Photography', 'Culture', 'Historical', 'Shopping', 'Diving', 'Festivals', 'Theme Parks', 'Wine Tasting'].map(activity => (
                            <label key={activity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    value={activity}
                                    checked={formData.activities.includes(activity)}
                                    onChange={(e) => handleMultiSelect('activities', e.target.value)}
                                />
                                <span>{activity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 6: Preferred Season (Multi-select) */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>6. Preferred Season (Select all that apply)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Winter', 'Spring', 'Summer', 'Fall'].map(season => (
                            <label key={season} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    value={season}
                                    checked={formData.season.includes(season)}
                                    onChange={(e) => handleMultiSelect('season', e.target.value)}
                                />
                                <span>{season}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Question 7: Travel Pace */}
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                    <h3>7. Travel Pace</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Slow', 'Balanced', 'Fast'].map(pace => (
                            <label key={pace} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="pace"
                                    value={pace}
                                    checked={formData.pace === pace}
                                    onChange={(e) => handleSingleSelect('pace', e.target.value)}
                                />
                                <span>{pace}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    style={{
                        padding: '0.75rem 2rem',
                        fontSize: '1rem',
                        backgroundColor: '#646cff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

