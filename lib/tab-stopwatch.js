"use babel";

import { CompositeDisposable } from "atom"

export default {

  subscriptions: null,
  statusBar: null,
  times: {},

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "tab-stopwatch:update": () => this.update()
    }))
    this.statusBar = atom.workspace.getFooterPanels()[0].getItem().leftPanel;
    atom.workspace.observeActivePaneItem(item => {
      this.compute(item);
    });
  },

  update() {
    this.compute(atom.workspace.getActivePaneItem())
  },

  compute(item) {
    try {
      if (item.constructor.name === "TextEditor") {
        if (!(item.id in this.times)) {
          this.times[item.id] = new Date();
        }
        let elapsedTime = new Date(new Date() - this.times[item.id])
        this.show(this.formatTime(elapsedTime));
      }
    } catch(e) {}
  },

  show(text) {
    let element = document.createElement("div");
    element.classList.add("tab-stopwatch", "inline-block");
    element.textContent = text;
    this.statusBar.removeChild(this.statusBar.lastChild);
    this.statusBar.appendChild(element);
  },

  deactivate() {},

  serialize() {},

  formatTime(time) {
    let s   = (time / 1000) % 60;
    let min = (time / (1000*60)) % 60;
    let h   = (time / (1000*60*60)) % 24;
    return ("Elapsed Time: " + Math.round(h)+"h "
                             + Math.round(min)+"min "
                             + Math.round(s)+"s");
  }

};
