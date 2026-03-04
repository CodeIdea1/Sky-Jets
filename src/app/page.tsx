import About from "./sections/About";
import AircraftDetails from "./sections/AircraftDetails";
import HeroSection from "./sections/HeroSection";
import FlyingExperience from "./sections/FlyingExperience";
import FlyAnywhere from "./sections/FlyAnywhere";
import Destinations from "./sections/Destinations";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <About/>
      <AircraftDetails/>
      <FlyingExperience/>
      <Destinations/>
    </div>
  );
}
