import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2),
  empresa: z.string().min(1),
  contacto: z.string().min(1),
  mensaje: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.safeParse(body);

    if (!data.success) {
      return NextResponse.json(
        { error: "Datos inválidos" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      // En desarrollo sin webhook configurado, solo loguear
      console.log("[ContactForm] Datos recibidos:", data.data);
      return NextResponse.json({ success: true });
    }

    const payload = {
      nombre: data.data.nombre,
      empresa: data.data.empresa,
      contacto: data.data.contacto,
      mensaje: data.data.mensaje,
      timestamp: new Date().toISOString(),
      origen: "landing-gannetlabs",
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("[ContactForm] Error al llamar a n8n:", response.status);
      return NextResponse.json(
        { error: "Error al procesar la solicitud" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ContactForm] Error inesperado:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
