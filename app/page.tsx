import Landing from "./components/banner/Landing";
import Why_choose from "./components/home/Why_choose";
import Discover from "./components/home/Discover";
import Join_Community from "./components/home/Join_Community";
import Members from "./components/home/Members";
import FrequencyAsked from "./components/home/FrequencyAsked";
export default function Home() {

  return (
    <main>
      <Landing />
      <Why_choose />
      <Discover />
      <Join_Community />
      <Members />
      <FrequencyAsked />
    </main>
  );
}
