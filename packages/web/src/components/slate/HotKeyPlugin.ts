import { isKeyHotkey } from 'is-hotkey';
import { Editor as CoreEditor } from 'slate';

export function Hotkey(hotkey: string, fn: (editor: CoreEditor) => any) {
  return {
    onKeyDown(event: Event, editor: CoreEditor, next: () => any) {
      const event2 = event as KeyboardEvent;
      if (isKeyHotkey(hotkey, event2)) {
        editor.command(fn);
      } else {
        return next();
      }
    },
  };
}
