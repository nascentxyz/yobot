import {
  Navbar,
  Main,
  GradientContainer,
  AppPageMain,
  CTA,
} from "src/components";

const App = () => (
  <GradientContainer>
    <Main>
      <Navbar accountButton={true} />
      <AppPageMain />
      <CTA />
    </Main>
  </GradientContainer>
);

export default App;
