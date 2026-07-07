import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Journey from "./components/Journey";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Toys from "./components/Toys";
import "./style/portfolio.css";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Journey />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Skills />
      </main>
      <Footer />
      <Toys />
    </>
  );
}

export default App;
