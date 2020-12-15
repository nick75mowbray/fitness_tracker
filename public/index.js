

init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    console.log(`workout line 8 ${workout}`);
    if (workout) {
      console.log(`new location set to: ${workout._id}`);
      location.search = "?id=" + workout._id;
    } else {
      console.log(`no location set`);
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

