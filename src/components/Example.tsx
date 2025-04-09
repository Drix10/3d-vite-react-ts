import { useState } from 'react';
import Button from './Button';

export default function Example() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="example">
            <h2>Example Component</h2>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>

            <div className="button-group">
                <Button
                    variant="primary"
                    size="medium"
                    onClick={() => setIsActive(true)}
                >
                    Activate
                </Button>

                <Button
                    variant="secondary"
                    size="medium"
                    onClick={() => setIsActive(false)}
                >
                    Deactivate
                </Button>
            </div>
        </div>
    );
} 