'use babel';

import TabStopwatch from '../lib/tab-stopwatch';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('TabStopwatch', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tab-stopwatch');
  });

  describe('when the tab-stopwatch:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.tab-stopwatch')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'tab-stopwatch:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.tab-stopwatch')).toExist();

        let tabStopwatchElement = workspaceElement.querySelector('.tab-stopwatch');
        expect(tabStopwatchElement).toExist();

        let tabStopwatchPanel = atom.workspace.panelForItem(tabStopwatchElement);
        expect(tabStopwatchPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'tab-stopwatch:toggle');
        expect(tabStopwatchPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.tab-stopwatch')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'tab-stopwatch:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let tabStopwatchElement = workspaceElement.querySelector('.tab-stopwatch');
        expect(tabStopwatchElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'tab-stopwatch:toggle');
        expect(tabStopwatchElement).not.toBeVisible();
      });
    });
  });
});
