import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';
import './editor-styles.css';

const TiptapEditor = ({ content, onUpdate, placeholder, isEditable = true }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content,
    editable: isEditable,
    onUpdate: ({ editor }) => {
      if (isEditable) {
        onUpdate(editor.getJSON());
      }
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror',
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(content);
      if (!isSame) {
        editor.commands.setContent(content, false);
      }
    }
  }, [content, editor]);

  return (
    <div className="tiptap-editor-wrapper border border-gray-300 rounded-lg">
      {isEditable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;