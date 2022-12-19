import React from 'react';
import './index.css';

function Confirm (props) {
    return (
        <div>
            <p>Are you sure?</p>
            <button 
                 onClick={() => 
                    props.onReset()
                } 
            >
                No
            </button>
            <button
                  onClick={() => 
                    props.onDeleted()
                } 
            >
                Si, eliminar
            </button>
        </div>
    )
};

export { Confirm };