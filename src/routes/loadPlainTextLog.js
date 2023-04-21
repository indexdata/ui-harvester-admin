function loadPlainTextLog(okapiKy, subPath, setPlainTextLog) {
  async function fetchData() {
    let res;
    try {
      res = await okapiKy(`harvester-admin/${subPath}`, {
        headers: { 'Accept': 'text/plain' }
      });
      setPlainTextLog(await res.text());
    } catch (e) {
      if (e.response.status === 404) {
        // This happens when the harvestable has never been run (i.e. has status NEW)
        setPlainTextLog('');
      } else {
        // Some other error that we don't know how to handle
        throw e;
      }
    }
  }
  fetchData();
}


export default loadPlainTextLog;
