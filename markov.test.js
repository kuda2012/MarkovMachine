const { MarkovMachine } = require("./markov");

test("Ensure once last word of original sentence is used in new sentence, the output ends", function () {
  let orignalSentence = "the cat in the hat";
  let orignalSentenceArray = orignalSentence.split(" ");
  let lastWord = orignalSentenceArray[orignalSentenceArray.length - 1];
  let mm = new MarkovMachine(orignalSentence);
  const newSentence = mm.makeText();
  let newSentenceArray = newSentence.split(" ");
  if (newSentenceArray.find((element) => element == lastWord)) {
    expect(newSentenceArray[newSentenceArray.length - 1]).toEqual(lastWord);
  }
});

test("Words in the new sentence follow each other based on the order they were in in the original sentence", function () {
  let orignalSentence = "the cat in the hat";
  let orignalSentenceArray = orignalSentence.split(" ");
  let mm = new MarkovMachine(orignalSentence);
  const newSentence = mm.makeText();
  let newSentenceArray = newSentence.split(" ");
  for (let i = 0; i < newSentenceArray.length; i++) {
    for (j = 0; j < orignalSentenceArray.length; j++) {
      if (
        orignalSentenceArray[j] + " " + orignalSentenceArray[j + 1] ==
          newSentenceArray[i] + " " + newSentenceArray[i + 1] &&
        j + 1 < orignalSentenceArray.length
      ) {
        expect(orignalSentenceArray[j]).toEqual(newSentenceArray[i]);
        expect(orignalSentenceArray[j + 1]).toEqual(newSentenceArray[i + 1]);
      }
    }
  }
});
