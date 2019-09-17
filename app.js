const timer= ms => new Promise(res => setTimeout(res,ms));

timer(3000).then(t => console.log(`t 3000`));
timer(30000).then(t => console.log(`t 30000`));
timer(300000).then(t => console.log(`t 300000`));

