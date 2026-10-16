import { closingCommitMessage } from "./conventional.js";

process.stdout.write(closingCommitMessage(process.env.PR_TITLE, process.env.PR_BODY));
