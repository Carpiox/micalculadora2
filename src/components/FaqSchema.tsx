import SchemaHead from "@/components/SchemaHead";
import { type FaqQuestion, generateFaqSchema } from "@/lib/schema";

interface FaqSchemaProps {
  questions: FaqQuestion[];
  schemaKey?: string;
}

export default function FaqSchema({ questions, schemaKey = "faq-schema" }: FaqSchemaProps) {
  if (!questions.length) {
    return null;
  }

  return <SchemaHead schema={generateFaqSchema(questions)} schemaKey={schemaKey} />;
}
