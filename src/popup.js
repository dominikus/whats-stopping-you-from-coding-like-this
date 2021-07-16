const code = `function startDeveloping(level) {
  console.log('internal:' + level);
  const DEFAULT_CONTRIBUTION_SIZE = 38;
  const colorScale = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  const allBoxes = document.querySelectorAll("rect.ContributionCalendar-day");
  allBoxes.forEach((box) => {
    let contributionColor = Math.round(Math.random());
    contributionColor = Math.min(
      colorScale.length - 1,
      contributionColor + level
    );
    box.style.fill = colorScale[contributionColor];
  });

  const possibleContributionLabels = document.querySelectorAll(
    "h2.text-normal"
  );
  possibleContributionLabels.forEach((label) => {
    const t = label.innerText;
    if (t.indexOf("contributions in") !== -1) {
      // split off leading number:
      let parts = t.split(" ");
      parts[0] = Math.floor(
          (Math.random() + 0.75) *
          allBoxes.length *
          Math.pow((level + 1), 2) *
          DEFAULT_CONTRIBUTION_SIZE
      );
      label.innerText = parts.join(" ");
    }
  });
};`;

let developButtons = document.querySelectorAll(".develop-button");

console.log("yo");
console.log(developButtons);

developButtons.forEach((button, i) => {
  button.onclick = () => {
    console.log("external: " + i);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: code + "startDeveloping(" + i + ")",
      });
    });

    window.close();
  };
});
