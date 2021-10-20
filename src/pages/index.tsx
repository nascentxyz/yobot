import {
  Navbar,
  Main,
  GradientContainer,
  LandingPageMain,
} from "src/components";

const Index = () => (
  <GradientContainer>
    <Main>
      <Navbar launchApp={true} />
      <LandingPageMain />
    </Main>
  </GradientContainer>
);

export default Index;
