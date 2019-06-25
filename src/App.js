import React, { Component,  useState, useEffect, Suspense} from 'react';
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
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
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
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

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
      <tr>
        <td>{data ? data.value1 : null}</td>
      </tr>
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
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncComponent {...props} />
        </Suspense>
     </div>
  );
}

const SuspenseCompWithLogs = withLogs(MySuspenseComponent);

const Calendar = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
    ()=> import("./AsyncComponent"));
});

class App extends Component {
  render() {
    return (
      <div className="App">
              <A_Form/>
              <Clicked4/>
              <Suspense fallback={<div>Loading...</div>}>
                    <Calendar />
              </Suspense>
      </div>
    );
  }
}

export default App;
