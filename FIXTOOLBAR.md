Что появилось:
toolbarLeftExtra — теперь можно воткнуть свои кнопки в самое начало тулбара, до разделителя
showEditingMode — если не нужен переключатель режимов, просто выключаем
hideHelpMenu — меню Help убирается, если передать true
stickyToolbar — тулбар теперь липнет к верху при скролле
Как использовать:

```jsx
<DocxEditor
  toolbarLeftExtra={
    <div className="flex gap-1">
      <button onClick={handleCustomAction}>Моя кнопка</button>
    </div>
  }
  showEditingMode={false}
  hideHelpMenu={true}
  stickyToolbar={true}
/>
```
Что поменял в коде:

В DocxEditor.tsx — добавил пропсы в интерфейс и передал их дальше в тулбар

В DocxEditorToolbar.tsx — воткнул рендер кастомных кнопок перед разделителем, обернул переключатель режимов в условие, добавил стили для sticky, пробросил hideHelpMenu

В TitleBar.tsx — добавил возможность скрывать Help в MenuBar

Нюанс: sticky тулбар будет работать только если у родительского контейнера есть прокрутка и нормальный position. Для доступа к API редактора из своих кнопок бери useRef<DocxEditorRef>().