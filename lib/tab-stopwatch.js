'use babel';

import TabStopwatchView from './tab-stopwatch-view';
import { CompositeDisposable } from 'atom';

export default {

  tabStopwatchView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tabStopwatchView = new TabStopwatchView(state.tabStopwatchViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tabStopwatchView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tab-stopwatch:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tabStopwatchView.destroy();
  },

  serialize() {
    return {
      tabStopwatchViewState: this.tabStopwatchView.serialize()
    };
  },

  toggle() {
    console.log('TabStopwatch was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
