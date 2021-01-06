import {Questions} from "../questions/Questions";
const category = "people";

export const App = ({options}) => {
    Questions(options.swApiBaseUrl,`${category}`);
}


