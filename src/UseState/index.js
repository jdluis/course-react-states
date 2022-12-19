import React from "react";
/* import { Confirm } from "../Confirm";
 */import { Loading } from "../Loading";

const SECURITY_CODE = "carol";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }
  
  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  }

  const onDeleted = () => {
    setState({
      ...state,
      deleted: true,
  });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
  });
  }

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
            onWrite(e.target.value)
          }}
        />
        <button
          onClick={() => {
            onCheck();
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
                    onReset();
                }}
            >
                No, me arrepentí
            </button>
            <button
                onClick={() => {
                    onDeleted();
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
                  onReset();
              }}
            >
                Recuperar UseState
            </button>
    </React.Fragment>
    )
  }
}


export { UseState };
