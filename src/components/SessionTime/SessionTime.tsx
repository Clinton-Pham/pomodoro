import React from 'react';

interface SessionTime {
    time: string;
}
export const SessionTime = ({time}: SessionTime) => {
    return(
        <h1>{time}</h1>
    )
}