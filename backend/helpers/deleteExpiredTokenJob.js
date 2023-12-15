const schedule = require("node-schedule");
const { getExpiredToken } = require("../database/interface");

let nextInvocation = "";
const dailyJob = schedule.scheduleJob("0 3 * * *", performDailyCleanup);

//JOB THAT DELETES EXPIRED TOKEN FROM DB
async function performDailyCleanup() {
  const expiredTokens = await getExpiredToken();
  console.log("DELETED EXPIRED TOKEN => ", expiredTokens);

  nextInvocation = JSON.stringify(dailyJob.nextInvocation()._date);
  console.log(`Daily module scheduled to run on ${nextInvocation}`);
}

// const nextInvocation = JSON.stringify(dailyJob.nextInvocation()._date);
