import {Questions} from "../questions/Questions";

export const App = ({options}) => {
    Questions(options.swApiBaseUrl + "/people/");
}


