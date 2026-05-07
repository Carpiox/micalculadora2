import { Helmet } from "react-helmet-async";

interface SchemaHeadProps {
  schema: object | object[];
  schemaKey?: string;
}

export default function SchemaHead({ schema, schemaKey = "schema" }: SchemaHeadProps) {
  const schemaList = Array.isArray(schema) ? schema : [schema];

  if (!schemaList.length) {
    return null;
  }

  return (
    <Helmet>
      {schemaList.map((item, index) => (
        <script key={`${schemaKey}-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
