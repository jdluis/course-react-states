import React from 'react';
import './index.css';

function Confirm (setState) {
    return (
        <div>
            <p>Are you sure?</p>
            <button 
                 onClick={() => 
                    setState({
                        confirmed: false,
                    })
                } 
            >
                No
            </button>
            <button
                  onClick={() => 
                    setState({
                        deleted: true,
                    })
                } 
            >
                Si, eliminar
            </button>
        </div>
    )
};

export { Confirm };