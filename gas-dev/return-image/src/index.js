import doPost from "./doPost"

global.doPost = doPost
global.doTest = () => { Logger.log("test"); }
