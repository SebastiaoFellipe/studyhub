import React from 'react';
import { 
  FaBold, FaItalic, FaStrikethrough, FaHeading, 
  FaListUl, FaListOl, FaQuoteLeft, FaUndo, FaRedo, FaRulerHorizontal
} from 'react-icons/fa';

const ToolbarButton = ({ onClick, isActive, children, title }) => (
  <button onClick={onClick} className={`toolbar-button ${isActive ? 'is-active' : ''}`} title={title}>
    {children}
  </button>
);

const Divider = () => <div className="toolbar-divider"></div>;

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap items-center gap-1 bg-gray-50">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Negrito">
        <FaBold />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Itálico">
        <FaItalic />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Riscado">
        <FaStrikethrough />
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Título 1">
        <FaHeading />1
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Título 2">
        <FaHeading />2
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Título 3">
        <FaHeading />3
      </ToolbarButton>

      <Divider />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Lista com Marcadores">
        <FaListUl />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Lista Numerada">
        <FaListOl />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Citação">
        <FaQuoteLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linha Horizontal">
        <FaRulerHorizontal />
      </ToolbarButton>

      <Divider />
      
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer">
        <FaUndo />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refazer">
        <FaRedo />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;