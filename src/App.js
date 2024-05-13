import logo from './logo.svg';
import './App.css';
import Layout from './core/Layout';
import { isAuth } from './auth/helpers';
function App() {
  return (
  <Layout>
      <h1>hello {isAuth().name}</h1>
  </Layout>
    
  );
}

export default App;
