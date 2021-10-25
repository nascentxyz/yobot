import { useYobot } from "src/contexts/YobotContext";

const useAuthedCallback = (callback: () => any) => {
  const { login, isAuthed } = useYobot();

  const authedCallback = () => {
    if (isAuthed) {
      return callback();
    } else {
      return login();
    }
  };

  return authedCallback;
};

export default useAuthedCallback;
