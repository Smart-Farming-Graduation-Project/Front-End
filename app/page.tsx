import Landing from "./components/banner/Landing";
import Why_choose from "./components/home/Why_choose";
import Discover from "./components/home/Discover";
import Join_Community from "./components/home/Join_Community";
import Members from "./components/home/Members";
import FrequencyAsked from "./components/home/FrequencyAsked";
import BenefitsImpact from "./components/home/BenefitsImpact";
import ProjectObjectives from "./components/home/ProjectObjectives";
import SystemArchitecture from "./components/home/SystemArchitecture";
import KeyFeatures from "./components/home/KeyFeatures";
import TechnologyStack from "./components/home/TechnologyStack";

export default function Home() {
  return (
    <main>
      <Landing />
      <Why_choose />
      <KeyFeatures />
      <SystemArchitecture />
      <TechnologyStack />
      <BenefitsImpact />
      <ProjectObjectives />
      <Discover />
      <Join_Community />
      <Members />
      <FrequencyAsked />
    </main>
  );
}
