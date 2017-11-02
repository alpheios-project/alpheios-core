import * as Content from './content-process';

// load options, then render
let contentProcess = new Content.Process();
contentProcess.loadData().then(() => {
    contentProcess.status = Content.Process.statuses.ACTIVE;
    contentProcess.render();
});