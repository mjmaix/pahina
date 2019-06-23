import { EventEmitter } from 'eventemitter3';
import _ from 'lodash';

import { DEFAULT_THEME, ThemeName, themes } from './themes';
import { logInfo } from '@pahina/core/src/utils';

type Theme = typeof themes[0];

type ThemeChangeEventListener = (data: Theme) => void;

class ThemeHelper {
  private event = new EventEmitter();
  private themes = themes;
  private themeName: ThemeName;
  private theme: Theme;
  constructor(cb?: ThemeChangeEventListener) {
    this.themeName = DEFAULT_THEME;
    this.theme = this.getTheme(this.themeName);
    this.handleChange = cb || this.handleChange;
    this.event.addListener('change', this.handleChange);
  }

  public get() {
    if (!this.theme) {
      this.loadTheme();
    }
    return this.theme;
  }

  public set(themeName: ThemeName) {
    this.themeName = themeName;
    this.loadTheme();
  }

  public addListener(cb: ThemeChangeEventListener) {
    this.event.addListener('change', cb);
  }

  public removeAllListeners() {
    this.event.removeAllListeners();
  }

  private handleChange(data: Theme) {
    // info(data);
  }

  private loadTheme() {
    this.theme = this.getTheme(this.themeName);
    this.event.emit('change', this.theme);
  }

  private getTheme: (key: ThemeName) => any = key => {
    const theme = _.find(this.themes, e => e.id === key);
    if (!theme) {
      logInfo(`Theme not found: ${theme}`);
      return this.getTheme(DEFAULT_THEME);
    }
    return theme;
  };
}

const instance = new ThemeHelper();

export { instance as ThemeHelper };
