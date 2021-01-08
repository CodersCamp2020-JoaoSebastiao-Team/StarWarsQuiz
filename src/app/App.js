import {Questions} from "../questions/Questions";
import {handleModeUpdate} from "../app/main-menu";
const category = "people";

export const App = ({options}) => {
    Questions(options.swApiBaseUrl,`${category}`);
}
