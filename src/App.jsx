import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.min.css';
import './App.css';
import { initialMarkdown } from './initialMarkdown.js';

// Configurar marked para usar highlight.js
marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  // Asegurar que highlight.js se aplique después de cada renderizado
  useEffect(() => {
    document.querySelectorAll('#preview pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [markdown]);

  return (
    <div className="container py-5">
      <div className="row g-4 justify-content-center align-items-center flex-column">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <span>Editor</span>
            </div>
            <div className="card-body">
              <textarea
                id="editor"
                className="form-control"
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              <span>Previewer</span>
            </div>
            <div className="card-body overflow-auto">
              <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
