import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";

// Styles for the PDF document
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "flex-start",
    fontFamily: "Times-Bold",
    marginBottom: 12,
  },
  author: {
    fontSize: 12,
    textAlign: "flex-start",
    marginBottom: 40,
    color: "grey",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    fontFamily: "Times-Bold",
  },
  subsubtitle: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "Times-Bold",
  },
  text: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "flex-start",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

// Parses inline Markdown for bold (**text**) and italic (*text*)
const parseInlineMarkdown = (text) => {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const [token] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index) });
    }

    if (token.startsWith("**")) {
      parts.push({ text: token.replace(/\*\*/g, ""), bold: true });
    } else if (token.startsWith("*")) {
      parts.push({ text: token.replace(/\*/g, ""), italic: true });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  return parts;
};

// Converts Markdown into structured blocks
const markdownToBlocks = (markdown) => {
  const lines = markdown
    .replace(/\[(.+?):\]/g, "**$1:**")
    .split("\n");

  const blocks = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("***") && trimmed.endsWith("***")) {
      blocks.push({
        type: "subsubtitle",
        text: trimmed.replace(/^\*{3}|\*{3}$/g, "").trim(),
      });
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      blocks.push({
        type: "subtitle",
        text: trimmed.replace(/^\*{2}|\*{2}$/g, "").trim(),
      });
    } else {
      blocks.push({
        type: "text",
        content: parseInlineMarkdown(trimmed),
      });
    }
  }

  return blocks;
};

// PDF Document structure
const MyDocument = ({ content = [] }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        Created by TARS - Copyright © 2025
      </Text>

      <Text style={styles.title}> Content Generated </Text>

      {content.map((item, index) => {
        if (item.type === "text" && item.content) {
          return (
            <View key={index}>
              <Text style={styles.text}>
                {item.content.map((chunk, i) => (
                  <Text
                    key={i}
                    style={{
                      fontFamily: chunk.bold
                        ? "Times-Bold"
                        : chunk.italic
                        ? "Times-Italic"
                        : "Times-Roman",
                    }}
                  >
                    {chunk.text}
                  </Text>
                ))}
              </Text>
            </View>
          );
        }

        const style =
          item.type === "subtitle"
            ? styles.subtitle
            : item.type === "subsubtitle"
            ? styles.subsubtitle
            : styles.text;

        return (
          <View key={index}>
            <Text style={style}>{item.text}</Text>
          </View>
        );
      })}

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
);

// Main component with a download button
const PdfGenerator = ({ content }) => {
  const [parsedContent, setParsedContent] = useState([]);

  useEffect(() => {
    const convertContent = () => {
      const allParsed = [];
      for (const item of content) {
        const parsedItems = markdownToBlocks(item.text);
        allParsed.push({ type: "subtitle", text: item.title }, ...parsedItems);
      }
      setParsedContent(allParsed);
    };

    convertContent();
  }, [content]);

  return (
    <PDFDownloadLink
      document={<MyDocument content={parsedContent} />}
      fileName="tars-summary.pdf"
    >
      <button type="button" className="icon-circle">
        <Download className="w-6 h-6 cursor-pointer" />
      </button>
    </PDFDownloadLink>
  );
};

export default PdfGenerator;