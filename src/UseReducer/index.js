import React from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = "carol";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
//Por convencion ya no usamos setState en el reducer, usamos dispatch.


  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          dispatch({type: actionTypes.CONFIRM}) //por convencion en mayus 
        } else {
          dispatch({type: actionTypes.ERROR})
        }

        console.log("Terminando la validacion");
      }, 3000);
    }
    console.log("Terminando el efecto");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
  
        <p>Por favor, escribe el codigo de seguridad.</p>
  
        {state.error &&
          !state.loading && ( //esta es la mejor forma de validar ya que no cambiamos el estado.
            <p>Error: El código es incorrecto</p>
          )}
        {state.loading && <Loading />}
  
        <input
          value={state.value}
          placeholder="Código de seguridad"
          onChange={(e) => {
            dispatch({type: actionTypes.WRITE, payload: e.target.value })
          }}
        />
        <button
          onClick={() => {
            dispatch({type: actionTypes.CHECK})
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
{/*         <Confirm setState={(patch) => setState({...state,...patch})}/>
 */}        <p>Are you sure?</p>
            <button 
                onClick={() => {
                    dispatch({type: actionTypes.RESET})
                }}
            >
                No, me arrepentí
            </button>
            <button
                onClick={() => {
                    dispatch({type: actionTypes.DELETE})
                }} 
            >
                Si, eliminar
            </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
      <p>Eliminado con exito</p>

      <button
                onClick={() => {
                    dispatch({type: actionTypes.RESET})
              }}
            >
                Recuperar UseState
            </button>
    </React.Fragment>
    )
  }
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    WRITE: 'WRITE',
    CHECK: 'CHECK',
    DELETE: 'DELETE',
    RESET: 'RESET',
}

//3 forma preferida por el tutor, con OPTIONS en un objeto

//ponemos el payload si es necesario, como en Write
const reducerObject = (state, payload) => ({
    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading:false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
});

//Si tenemos algun parametro que pasar, es decir payload lo pasamos en el return con action.payload
const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
};

export { UseReducer };