import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import { Widget } from '@phosphor/widgets';

import { ICommandPalette, VDomRenderer, VDomModel } from '@jupyterlab/apputils';

import { IMainMenu } from '@jupyterlab/mainmenu';

import '../style/index.css';
import CondaEnvWidget from './CondaEnvWidget';

const condaEnvId = 'jupyterlab_nb_conda';

function activateCondaEnv(app: JupyterLab, palette: ICommandPalette, menu: IMainMenu){

  const widget: VDomRenderer<VDomModel> = new CondaEnvWidget(-1, -1);
  widget.id = condaEnvId;
  widget.title.label = 'Conda Packages Manager';
  widget.title.closable = true;

  const command: string = 'condaenv:open-ui';
  app.commands.addCommand(command, {
    label: 'Conda Packages Manager',
    execute: () => {
      if (!widget.isAttached) {
        /** Attach the widget to the main work area if it's not there */
        app.shell.addToMainArea(widget as Widget);
      }
      /** Activate the widget */
      app.shell.activateById(widget.id);
    }
  });

  /** Add command to command palette */
  palette.addItem({ command, category: 'Settings' });

  /** Add command to settings menu */
  menu.settingsMenu.addGroup([{ command: command }], 999);
};

/**
 * Initialization data for the jupyterlab_nb_conda extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: condaEnvId,
  autoStart: true,
  activate: activateCondaEnv,
  requires: [
    ICommandPalette,
    IMainMenu
  ]
};

export default extension;
