import React, { Component,  useState, useEffect, Suspense, useContext} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const StatelessComponent = ({addText}) => {

  return <div>STATELESS POWAAA !!! {addText}</div>
}

const clickForEveryone = (initial) => {
  const [count, setCount] = useState(0);

  const addCount = ()=>{
    console.log("here "+count);
    setCount(v => v+1);
  }

  return [count, addCount];
}

const Hooked = () => {
  const [count] = clickForEveryone(0);

  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

function Clicked (){
  const [count,addCount] = clickForEveryone(0);


  return (
    <div>
      <button onClick={()=>addCount()}>
        Click me {count}
      </button>
    </div>
  );
}

/* exemple d'utilisation avec un state normal qui lui fonctionne avec des fonctions natives JS */
class Clicked3 extends Component {
  constructor(props) {
    super(props);
    this.state = {count:0};
  }

  launchTimer() {
    const {count} = this.state;
    this.setState({count:count+1});
  }

  render() {
    const {count} = this.state;

    return (

      <div>
        <button onClick={() => setInterval(()=>this.launchTimer(),2000)}>
          Click me {count}
        </button>
      </div>
      )
  }
}

/* Exemple utilisant mal le state hook qui ne doit pas etre utilisé dans une fonction autre que react car l'ordre d'exécution est important pour les hooks*/
const Clicked2 = () => {
  const [count,setCount] = clickForEveryone(0);

  const launchTimer = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <button onClick={() => setInterval(()=>launchTimer(),2000) }>
        Click mee {count}
      </button>
    </div>
  );
}


const Clicked4 = () => {
  const [count,setCount] = clickForEveryone(0);

  useEffect(()=> {
    const id = setInterval(()=>{
      setCount();
    },1000)
    return ()=>clearInterval(id)
  }, []);

  return (
    <div>
      <label>
        Click mee {count}
      </label>
    </div>
  );
}

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="https://image.flaticon.com/icons/svg/47/47197.svg" style={{ width:'20px', position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.toto(this.state)}
      </div>
    );
  }
}


const B_Tab = (props) => {
  const {data} = props;
  return (
    <table>
      <tbody>
        <tr>
          <td>{data ? data.value1 : null}</td>
        </tr>
       </tbody>
    </table>
    )
  }

class A_Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {value1:"coucou"} };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if(event)
    {
        event.preventDefault();
    }
    const form = document.getElementById("theform");
    let data = [];
    for (let i=0; i<form.elements.length; i++){
      const name = form.elements[i].name;
      const value = form.elements[i].value;
      data[name] = value;
    }
    this.setState({data});
  }

  render () {
    const {data} = this.state;
    return (<div>
      <form onSubmit={this.handleSubmit} id="theform">
          <input type="text" name="value1" placeholder="value1" />
          <input type="text" name="value2" placeholder="value2" />
          <input type="text" name="value3" placeholder="value3" />
          
          <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
      <B_Tab data={data}/>
    </div>)
  }

}


//Props de rendu (render props component)
//permet d'utiliser une props pour déterminer ce que va rendre un composant.
// ca permet de partager plus facilement les fonctionnalités
// ici mouse récupère la position de la souris et le fourni à cat pour qu'il affiche le chat aux coordonnées
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse toto={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

//exemple higher component (ou composant d ordre supérieur)
function withLogs(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {

    componentDidMount() {
      console.log("Mounting " + WrappedComponent.name);
    }

    componentWillUnmount() {
      console.log("Will unmount " + WrappedComponent.name);
    }

    render() {
      console.log("Rendering " + WrappedComponent.name);
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}

const AsyncComponent = React.lazy(() => import('./AsyncComponent'));
function MySuspenseComponent(props) {
  return (
    <div>
        <Suspense fallback={<div>Loading2...</div>}>
          <AsyncComponent {...props} />
        </Suspense>
     </div>
  );
}

const SuspenseCompWithLogs = withLogs(MySuspenseComponent);

const Calendar = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 3 * 1000)).then(
    ()=> import("./AsyncComponent"));
});

const contentElement = document.getElementById('content');

const PortalComponent = () => {
  return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <div> Portaled component </div>,
      // A DOM element
      contentElement,
    );
}

//display multiple component using array as return
const MultipleComponents = () => {
  return [
    <h3> Multiple components : </h3>,
    <span key='1'> Component One </span>,
    <span key='2'> Component Two </span>,
    <span key='3'> Component Three </span>,
  ]
}

//context example
const ColorContext = React.createContext({color:'blue'});

class ColoredButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ColorContext;
  render() {
    const divStyle = {
      backgroundColor: this.context.color
    };
    return <button style={divStyle} > Hello </button>;
  }
}

const ColoredDiv = props => {
  const context = useContext(ColorContext)
  const divStyle = {
    backgroundColor: context.color,
    width: '150 px',
    height: '150px'
  };
  return(
      <div style={divStyle} />
    );
}


class ContextComponent extends React.Component {
  render() {
    return (
      <div>
      <ColorContext.Provider value={{color:'yellow'}}>
        <ColoredButton />
        <ColoredDiv />
      </ColorContext.Provider>
        <ColoredDiv />
       </div>
      );
  }

}

class App extends Component {
  render() {
    return (
      <div className="App">
              <MultipleComponents/>
              <A_Form/>
              <Clicked4/>
              <MouseTracker/>
              <Suspense fallback={<div>Loading1...</div>}>
                <Calendar />
              </Suspense>
              <PortalComponent/>
              <ContextComponent/>
      </div>
    );
  }
}

export default App;
