import React from "react";
import { Loading } from "../Loading";

const SECURITY_CODE = 'carol';


class ClassState extends React.Component {
    constructor(props) {
        super(props); //Hay que llamar en el constructor a super si queremos
        //añadir una nueva propiedad al estado, por lo que pasamos las props al constructor y luego a super

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    };

    componentDidUpdate () {
        console.log('componentDidUpdate')
        if(!!this.state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion')
    
                if ( this.state.value === SECURITY_CODE ) {
                    this.setState({error: false, loading: false});
                } else {
                    this.setState({error: true, loading: false});
                };
    
                console.log('Terminando la validacion')
            }, 3000)
        }
    }


  render() {
    //const { error, loading, value } = this.state;
    //Podemos usar la destructuracion de arriba para no llamar todo el tiemo a this.state
    
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>

        <p>Por favor, escribe el codigo de seguridad.</p>
        
        {(this.state.error && !this.state.loading) && (
            <p>Error: El código es incorrecto</p>
        )}
        {this.state.loading && (
            <Loading/>
        )}

        <input 
            placeholder="Código de seguridad"
            value={this.state.value}
            onChange={(e) => {
                this.setState({value: e.target.value})
            }}
        />
        <button
            onClick={()=> this.setState({loading: true})}
        >
            Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
