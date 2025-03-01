'use client'

import '../styles/editor.css'

import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDIwODMxOTksImp0aSI6ImQxNDg5OWFkLTliNmQtNDllNi05MjA5LWQ3ZDMyZDA2MTYxNCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjAyMmNkZGFjIn0._OMNwll4SCIhzjhqs5cBbrnTaxVSzOgn2-p0oP2oy9L-9DsXBTZZnPv7vWXXjFh0WgxM_QXQDvvemSh1tbz_AA'

export function Editor() {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const editorMenuBarRef = useRef<HTMLDivElement>(null)
  const editorToolbarRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const editorMinimapRef = useRef<HTMLDivElement>(null)
  const editorWordCountRef = useRef<HTMLDivElement>(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const cloud = useCKEditorCloud({ version: '44.2.1' })

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  const { DecoupledEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
      return {}
    }

    const {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      DecoupledEditor,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Base64UploadAdapter,
      BlockQuote,
      BlockToolbar,
      Bold,
      Bookmark,
      Code,
      CodeBlock,
      Emoji,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      Mention,
      Minimap,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      RemoveFormat,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Title,
      TodoList,
      Underline,
      WordCount
    } = cloud.CKEditor

    return {
      DecoupledEditor,
      editorConfig: {
        toolbar: {
          items: [
            'showBlocks',
            'findAndReplace',
            'textPartLanguage',
            '|',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'emoji',
            'specialCharacters',
            'horizontalLine',
            'pageBreak',
            'link',
            'bookmark',
            'insertImage',
            'insertImageViaUrl',
            'mediaEmbed',
            'insertTable',
            'highlight',
            'blockQuote',
            'codeBlock',
            'htmlEmbed',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          Base64UploadAdapter,
          BlockQuote,
          BlockToolbar,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Emoji,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Markdown,
          MediaEmbed,
          Mention,
          Minimap,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          RemoveFormat,
          ShowBlocks,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline,
          WordCount
        ],
        balloonToolbar: [
          'bold',
          'italic',
          '|',
          'link',
          'insertImage',
          '|',
          'bulletedList',
          'numberedList'
        ],
        blockToolbar: [
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          '|',
          'link',
          'insertImage',
          'insertTable',
          '|',
          'bulletedList',
          'numberedList',
          'outdent',
          'indent'
        ],
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        initialData:
          '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        mention: {
          feeds: [
            {
              marker: '@',
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ]
            }
          ]
        },
        menuBar: {
          isVisible: true
        },
        minimap: {
          container: editorMinimapRef.current,
          extraClasses:
            'editor-container_include-minimap ck-minimap__iframe-content'
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties'
          ]
        }
      }
    }
  }, [cloud, isLayoutReady])

  return (
    <div className='main-container'>
      <div
        className='editor-container editor-container_document-editor editor-container_include-minimap editor-container_include-word-count'
        ref={editorContainerRef}
      >
        <div className='editor-container__menu-bar' ref={editorMenuBarRef} />
        <div className='editor-container__toolbar' ref={editorToolbarRef} />
        <div className='editor-container__minimap-wrapper'>
          <div className='editor-container__editor-wrapper'>
            <div className='editor-container__editor'>
              <div ref={editorRef} className='prose'>
                {DecoupledEditor && editorConfig && (
                  <CKEditor
                    onReady={(editor) => {
                      const wordCount = editor.plugins.get('WordCount')
                      editorWordCountRef?.current?.appendChild(
                        wordCount.wordCountContainer
                      )

                      editorToolbarRef?.current?.appendChild(
                        editor.ui.view.toolbar.element as HTMLElement
                      )

                      editorMenuBarRef.current?.appendChild(
                        editor.ui.view.menuBarView.element as HTMLElement
                      )
                    }}
                    onAfterDestroy={() => {
                      // biome-ignore lint/complexity/noForEach: <explanation>
                      Array.from(
                        editorWordCountRef.current?.children || []
                      ).forEach((child) => child.remove())

                      // biome-ignore lint/complexity/noForEach: <explanation>
                      Array.from(
                        editorToolbarRef.current?.children || []
                      ).forEach((child) => child.remove())

                      // biome-ignore lint/complexity/noForEach: <explanation>
                      Array.from(
                        editorMenuBarRef.current?.children || []
                      ).forEach((child) => child.remove())
                    }}
                    editor={DecoupledEditor}
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    config={editorConfig as any}
                  />
                )}
              </div>
            </div>
          </div>
          <div className='editor-container__sidebar editor-container__sidebar_minimap'>
            <div ref={editorMinimapRef} />
          </div>
        </div>
        <div
          className='editor_container__word-count'
          ref={editorWordCountRef}
        />
      </div>
    </div>
  )
}
