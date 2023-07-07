import React from 'react';

interface SessionLengthButtonProps {
    sessionLength: number;
    onChange: (newTime: number) => void;
}

export const SessionLengthButton: React.FC<SessionLengthButtonProps> = ({sessionLength, onChange}: SessionLengthButtonProps) => {
    const handleIncrementCounter = () => {
        onChange(sessionLength + 1);
    }

    const handleDecrementCounter = () => {
        onChange(sessionLength > 1 ? sessionLength - 1 : 1);
        console.log(sessionLength)
    }
    return(
        <div>
        <button onClick={handleIncrementCounter}>up</button>
        <button onClick={handleDecrementCounter}>down</button>
            <h5>{sessionLength}</h5>
        </div>
    )
}