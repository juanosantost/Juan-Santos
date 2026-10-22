import { LearningModule, CaseDilemma, QuizQuestion, Badge } from '../types/sena';

export const SENA_REGULATION_INFO = {
  normaPrincipal: "Acuerdo 009 de 2024",
  entidad: "Servicio Nacional de Aprendizaje - SENA",
  vigencia: "Vigente (Actualiza y deroga el Acuerdo 007 de 2012 y normas concordantes)",
  enfoque: "Formación Profesional Integral, Enfoque Diferencial, Inclusión y Prevención de Violencias de Género (Ley 2365 de 2024)",
  lema: "El SENA es Colombia, esperanza para la juventud y motor del desarrollo productivo"
};

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "mod-1",
    number: "01",
    title: "Identidad SENA y Marco Institucional",
    shortDesc: "Misión institucional, valores, modalidades formativas y el nuevo marco normativo del Acuerdo 009 de 2024.",
    iconName: "Compass",
    quizQuestionCount: 2,
    topics: [
      {
        id: "top-1-1",
        title: "¿Qué es el SENA y cuál es su misión?",
        subtitle: "Entidad pública adscrita al Ministerio del Trabajo",
        articleRef: "Ley 119 de 1994 & Acuerdo 009 de 2024",
        content: [
          "El SENA (Servicio Nacional de Aprendizaje) es un establecimiento público del orden nacional con personería jurídica, patrimonio propio e independiente y autonomía administrativa.",
          "Tiene la misión de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la Formación Profesional Integral para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país."
        ],
        keyPoints: [
          "Gratuidad: La formación en el SENA es 100% gratuita y no requiere intermediarios.",
          "Formación Profesional Integral (FPI): Desarrolla el saber, el saber hacer y el ser.",
          "Símbolos institucionales: Escudo (los tres sectores económicos: primario, secundario y terciario), Bandera (fondo blanco con escudo institucional) y el Himno al SENA."
        ],
        exampleScenario: {
          context: "Un postulante escucha rumores de que una persona le cobra por 'asegurar' su cupo o certificado.",
          action: "El aprendiz recuerda que los trámites en el SENA son gratuitos e informa a las autoridades del centro.",
          explanation: "La gratuidad es un principio inquebrantable del SENA; ningún funcionario ni tercero puede cobrar por inscripciones, formación ni certificaciones."
        }
      },
      {
        id: "top-1-2",
        title: "Nuevo Acuerdo 009 de 2024: Novedades Clave",
        subtitle: "Armonización legal, enfoque diferencial y protocolos de convivencia",
        articleRef: "Acuerdo 009 de 2024 - Considerandos y Cap. I",
        content: [
          "El Consejo Directivo Nacional del SENA expidió el Acuerdo 009 de 2024 para actualizar y unificar el Reglamento del Aprendiz, derogando normas anteriores como el Acuerdo 007 de 2012.",
          "Incorpora de manera vinculante la atención a la Ley 2365 de 2024 sobre prevención y sanción del acoso sexual en el ámbito educativo y laboral, adoptando rutas prioritarias de protección.",
          "Fortalece el enfoque diferencial, pluralista y de ajustes razonables para personas con discapacidad o en situación de vulnerabilidad."
        ],
        keyPoints: [
          "Regula todas las modalidades: Presencial, Virtual, A Distancia y Formación Dual.",
          "Garantía expresa del debido proceso en toda actuación académica o disciplinaria.",
          "Enfoque pedagógico y restaurativo por encima de lo meramente punitivo."
        ]
      }
    ]
  },
  {
    id: "mod-2",
    number: "02",
    title: "Derechos del Aprendiz SENA",
    shortDesc: "Garantías académicas, bienestar, carné, representatividad y debido proceso.",
    iconName: "ShieldCheck",
    quizQuestionCount: 3,
    topics: [
      {
        id: "top-2-1",
        title: "Derechos de Carácter Académico",
        subtitle: "Calidad, evaluación objetiva, ajustes y planes de mejoramiento",
        articleRef: "Acuerdo 009 de 2024 - Capítulo de Derechos",
        content: [
          "Recibir formación profesional integral de calidad acorde con el diseño curricular del programa en el que está matriculado.",
          "Recibir inducción completa sobre la entidad, el reglamento, el bienestar al aprendiz y el programa de formación al iniciar su proceso.",
          "Ser evaluado de manera objetiva y conocer oportunamente los resultados de sus evaluaciones en un plazo no mayor a ocho (8) días hábiles posteriores a su presentación, solicitando revisiones cuando existan discrepancias justificadas.",
          "Acceder a Planes de Mejoramiento Académico concertados cuando no se evidencie el logro de resultados de aprendizaje, antes de cualquier medida sancionatoria."
        ],
        keyPoints: [
          "Uso de ambientes: Ambientes de aprendizaje dotados de recursos tecnológicos, maquinaria, bibliotecas físicas y virtuales (SENALIB).",
          "Ajustes razonables: Adaptaciones curriculares o de accesibilidad si presenta discapacidad física, sensorial o cognitiva.",
          "Certificación: Recibir el título o certificado al cumplir satisfactoriamente la etapa lectiva y productiva."
        ],
        exampleScenario: {
          context: "Camila presentó su proyecto de software hace 12 días hábiles y aún no tiene retroalimentación ni calificación registrada en la plataforma educativa.",
          action: "Camila ejerce su derecho a solicitar cortésmente a su instructor la retroalimentación oportuna según los plazos del reglamento.",
          explanation: "El aprendiz tiene derecho a conocer oportunamente sus evaluaciones para poder corregir y afianzar competencias antes del cierre de resultados."
        }
      },
      {
        id: "top-2-2",
        title: "Derechos Comportamentales y Bienestar",
        subtitle: "Trato digno, carné, representación estudiantil y bienestar integral",
        articleRef: "Acuerdo 009 de 2024 - Derechos Comportamentales",
        content: [
          "Ser tratado con dignidad, respeto, equidad y sin ningún tipo de discriminación por razones de raza, etnia, género, orientación sexual, religión, ideología o condición socioeconómica.",
          "Portar y ser acreditado con el Carné Institucional del SENA como documento de identificación de su condición de aprendiz.",
          "Disfrutar de los programas de Bienestar al Aprendiz: salud integral, deporte y recreación, cultura, liderazgo, desarrollo humano y apoyos de sostenimiento (regular o FIC según requisitos).",
          "Elegir y ser elegido: Postularse como vocero de ficha o representante de aprendices ante el Centro de Formación en los comités respectivos."
        ],
        keyPoints: [
          "Debido Proceso: Ser escuchado en descargos, aportar pruebas y contar con el derecho a la contradicción e impugnación (recurso de reposición).",
          "Protección de salud y riesgos: Estar cubierto en la póliza de accidentes escolares durante las actividades formativas del centro y visitas autorizadas."
        ]
      }
    ]
  },
  {
    id: "mod-3",
    number: "03",
    title: "Deberes del Aprendiz SENA",
    shortDesc: "Compromisos éticos, uso de tecnologías e IA, convivencia y prevención de violencias.",
    iconName: "Award",
    quizQuestionCount: 3,
    topics: [
      {
        id: "top-3-1",
        title: "Deberes Académicos y Ética Intelectual",
        subtitle: "Honestidad académica, cumplimiento y uso responsable de IA",
        articleRef: "Acuerdo 009 de 2024 - Capítulo de Deberes",
        content: [
          "Cumplir cabalmente con todas las actividades de aprendizaje programadas en el plan de estudio y en los planes de mejoramiento concertados.",
          "Garantizar la autoría e integridad académica en todas las evidencias, tareas, informes y proyectos entregados.",
          "Uso ético de tecnologías e Inteligencia Artificial: Cuando se utilicen herramientas de IA generativa o fuentes bibliográficas, es obligación citar adecuadamente la fuente y no presentar contenidos generados automáticamente como si fueran de propia autoría (antiplagio).",
          "Participar activamente en foros, sesiones sincrónicas, visitas técnicas y evaluaciones formativas con puntualidad y rigor."
        ],
        keyPoints: [
          "Informar novedades: Comunicar oportunamente al instructor y coordinación médica o de ficha cualquier incapacidad o fuerza mayor en un término de 3 días hábiles.",
          "Aprobación de evidencias: Sustentar de manera idónea el dominio práctico de los saberes técnicos."
        ],
        exampleScenario: {
          context: "Carlos tiene que entregar un informe de auditoría contable. Utiliza un modelo de lenguaje para redactar un resumen.",
          action: "Carlos cita explícitamente en la bibliografía el uso de la herramienta para estructurar la síntesis y redacta sus propias conclusiones técnicas.",
          explanation: "El SENA fomenta la innovación y el uso de tecnologías de punta, pero exige rigurosidad ética y transparencia en la autoría de las evidencias."
        }
      },
      {
        id: "top-3-2",
        title: "Deberes de Convivencia y Cuidado Institucional",
        subtitle: "Respeto, uso de EPP, carné y prevención del acoso (Ley 2365 de 2024)",
        articleRef: "Acuerdo 009 de 2024 & Ley 2365 de 2024",
        content: [
          "Portar en lugar visible el Carné Institucional dentro del Centro de Formación y durante las actividades externas donde represente a la entidad.",
          "Usar la dotación reglamentaria y los Elementos de Protección Personal (EPP) según las normas de Seguridad y Salud en el Trabajo (SST) en talleres y laboratorios.",
          "Mantener un trato respetuoso hacia instructores, aprendices, directivos, personal administrativo y de servicios generales.",
          "Cero tolerancia a conductas de acoso sexual, acoso escolar (bullying), intimidación o discriminación. Activar o cooperar con los protocolos de atención institucional.",
          "Cuidar las instalaciones, mobiliario, maquinaria, recursos de software y participar activamente en el Plan de Gestión Ambiental del Centro."
        ],
        keyPoints: [
          "Cuidado de claves y accesos: Es deber custodiar las credenciales de SofíaPlus / Zajuna y no compartirlas.",
          "Convivencia pacífica: Resolver diferencias a través del diálogo constructivo y canales de conciliación."
        ]
      }
    ]
  },
  {
    id: "mod-4",
    number: "04",
    title: "Prohibiciones, Faltas, Medidas y Etapa Productiva",
    shortDesc: "Clasificación de faltas, debido proceso, comités, trámites y opciones de práctica.",
    iconName: "AlertTriangle",
    quizQuestionCount: 2,
    topics: [
      {
        id: "top-4-1",
        title: "Prohibiciones Expresas y Tipos de Faltas",
        subtitle: "Límites claros para garantizar la seguridad y la convivencia",
        articleRef: "Acuerdo 009 de 2024 - Prohibiciones y Faltas",
        content: [
          "Se prohíbe terminantemente: ingresar, consumir o distribuir bebidas embriagantes o sustancias psicoactivas en el SENA o asistir bajo sus efectos.",
          "Portar armas de cualquier tipo u objetos punzocortantes no autorizados.",
          "Plagiar, falsificar o alterar firmas, incapacidades, notas o documentos públicos/privados.",
          "Realizar proselitismo político o religioso dentro de los ambientes de aprendizaje del centro.",
          "Suplantar la identidad de otro aprendiz en clases presenciales, plataformas virtuales o evaluaciones."
        ],
        keyPoints: [
          "Faltas Académicas: Incumplimiento no justificado de compromisos de aprendizaje, plagio o no entrega reiterada de evidencias.",
          "Faltas Disciplinarias: Actos que vulneran la convivencia, la moral, el respeto, los bienes de la entidad o la integridad física/emocional.",
          "Gradación: Se clasifican en Leves, Graves y Gravísimas según el daño, la reiteración y la premeditación."
        ]
      },
      {
        id: "top-4-2",
        title: "Medidas Formativas vs. Sanciones Disciplinarias",
        subtitle: "Ruta del debido proceso y Comité de Evaluación y Seguimiento",
        articleRef: "Acuerdo 009 de 2024 - Medidas y Sanciones",
        content: [
          "Medidas Formativas: Tienen carácter pedagógico y preventivo. Incluyen el Llamado de atención disciplinario verbal o escrito (máximo 2) y el Plan de Mejoramiento (uno por etapa lectiva y uno por productiva).",
          "Sanciones Disciplinarias: Son impuestas únicamente tras el debido proceso en el Comité de Evaluación y Seguimiento. Incluyen: Llamado de atención escrito con copia a la hoja de vida, Condicionamiento de matrícula y Cancelación de matrícula (con sanción de 6 a 24 meses para volver a ingresar al SENA).",
          "Garantías: El aprendiz tiene derecho a ser notificado formalmente, presentar descargos, aportar pruebas y presentar recurso de reposición en los tiempos estipulados."
        ],
        keyPoints: [
          "Novedades administrativas: El aprendiz puede solicitar Aplazamiento justificado (hasta por 6 meses prorrogable), Traslado de centro/jornada o Retiro voluntario.",
          "Deserción: Se configura cuando el aprendiz deja de asistir 3 días hábiles consecutivos sin justificación y no responde al requerimiento en los 5 días siguientes."
        ]
      },
      {
        id: "top-4-3",
        title: "Alternativas de Etapa Productiva",
        subtitle: "Opciones legales para certificar la etapa práctica",
        articleRef: "Acuerdo 009 de 2024 - Etapa Productiva",
        content: [
          "La etapa productiva permite al aprendiz aplicar en el entorno real de trabajo los conocimientos adquiridos en la etapa lectiva.",
          "Alternativas avaladas por la ley:",
          "1. Contrato de Aprendizaje (con apoyo de sostenimiento y afiliación a EPS y ARL).",
          "2. Proyecto Productivo (creación de empresa propia o innovación ligada al programa a través de Fondo Emprender o SENA Innova).",
          "3. Pasantía (concertada con una empresa u organización, con ARL).",
          "4. Monitoría en el SENA (apoyando procesos formativos o tecnológicos en el centro).",
          "5. Apoyo a instituciones del Estado, ONG o entidades sin ánimo de lucro."
        ],
        keyPoints: [
          "Plazo de culminación: El aprendiz dispone de hasta 24 meses tras terminar la etapa lectiva para radicar y certificar su etapa productiva.",
          "Bitácoras periódicas: Es obligatorio concertar plan de trabajo y subir bitácoras quincenales/mensuales firmadas por el coformador."
        ]
      }
    ]
  }
];

export const CASE_DILEMMAS: CaseDilemma[] = [
  {
    id: "caso-1",
    title: "El Dilema del Informe de Investigación y la IA",
    category: "Deber",
    character: "Mateo",
    role: "Aprendiz de Análisis y Desarrollo de Software",
    scenario: "Mateo tiene una entrega crucial de arquitectura de base de datos mañana. Por motivos de trabajo no alcanzó a estudiar a fondo y le pide a un sistema de inteligencia artificial que le redacte todo el código, la documentación técnica y las conclusiones. ¿Qué debería hacer Mateo antes de subir la evidencia?",
    choices: [
      {
        id: "c1-a",
        text: "Copiar y pegar todo tal cual sin mencionar la IA, esperando que el instructor no lo note.",
        isCorrect: false,
        consequence: "Configura falta académica por vulneración a la integridad y plagio. Mateo se arriesga a un llamado de atención y anulación de la evidencia.",
        legalBasis: "Acuerdo 009 de 2024 prohíbe atribuirse autoría sobre contenidos generados por terceros o herramientas sin su debida referencia.",
        xpReward: 0
      },
      {
        id: "c1-b",
        text: "Revisar y validar el código, adaptarlo a las necesidades del proyecto y citar en la bibliografía el uso de la herramienta de IA como apoyo técnico.",
        isCorrect: true,
        consequence: "¡Excelente decisión! Mateo demuestra honestidad intelectual, apropia el conocimiento y cumple con los estándares éticos del SENA.",
        legalBasis: "El reglamento promueve la tecnología siempre que se transparente la autoría y se evidencie el dominio de las competencias.",
        xpReward: 150
      },
      {
        id: "c1-c",
        text: "No entregar nada y faltar al ambiente de formación para evitar el reclamo del instructor.",
        isCorrect: false,
        consequence: "Genera inasistencia no justificada y retraso formativo, pudiendo iniciar causal de deserción si se prolonga.",
        legalBasis: "Es deber del aprendiz comunicar oportunamente dificultades y responder por sus compromisos formativos.",
        xpReward: 10
      }
    ]
  },
  {
    id: "caso-2",
    title: "Conflicto y Presunto Acoso en el Grupo de Trabajo",
    category: "Convivencia",
    character: "Valeria",
    role: "Aprendiz de Gestión Empresarial",
    scenario: "Durante el desarrollo de un proyecto en equipo, un compañero de ficha hace comentarios desobligantes y conductas de hostigamiento de carácter sexual hacia Valeria y otras compañeras, creando un ambiente intimidante. ¿Cuál es la ruta reglamentaria que debe seguirse?",
    choices: [
      {
        id: "c2-a",
        text: "Guardar silencio para no generar discordia en la ficha ni retrasar la calificación del proyecto grupal.",
        isCorrect: false,
        consequence: "Perpetúa la situación de vulnerabilidad. El silencio nunca debe ser el mecanismo ante la vulneración de la dignidad humana.",
        legalBasis: "La Ley 2365 de 2024 y el Acuerdo 009 de 2024 establecen el deber de no tolerar ni encubrir violencias o acoso.",
        xpReward: 0
      },
      {
        id: "c2-b",
        text: "Acudir a la vocera de ficha, instructor técnico o Coordinación Misional/Bienestar para activar la ruta del protocolo de prevención y atención del acoso sexual.",
        isCorrect: true,
        consequence: "¡Ruta correcta y oportuna! Se brinda acompañamiento confidencial con enfoque de derechos y garantías de protección inmediata para las víctimas.",
        legalBasis: "Acuerdo 009 de 2024 y Ley 2365 de 2024: Ruta de atención con enfoque de género, protección a la víctima y debido proceso.",
        xpReward: 150
      },
      {
        id: "c2-c",
        text: "Agredir físicamente al compañero en los pasillos del centro para defender su honor.",
        isCorrect: false,
        consequence: "Incurre en falta disciplinaria gravísima por violencia física, con apertura inmediata de comité y posible cancelación de matrícula.",
        legalBasis: "Las vías de hecho están expresamente prohibidas en el reglamento del aprendiz.",
        xpReward: 0
      }
    ]
  },
  {
    id: "caso-3",
    title: "Oportunidad Laboral Inesperada y Solicitud de Novedad",
    character: "Santiago",
    category: "Derecho",
    role: "Aprendiz de Mantenimiento Mecatrónico",
    scenario: "Santiago está en tercer trimestre de etapa lectiva. A su familia le surge una calamidad y le ofrecen un trabajo temporal de tiempo completo por 4 meses en otra ciudad que le impide asistir al centro. Santiago no quiere perder su formación técnica. ¿Qué trámite reglamentario debe radicar?",
    choices: [
      {
        id: "c3-a",
        text: "Dejar de asistir sin avisar y volver el próximo año a ver si los instructores le guardan el puesto.",
        isCorrect: false,
        consequence: "Se declarará deserción por inasistencia superior a 3 días hábiles consecutivos y cancelación de matrícula con sanción de 6 meses sin poder inscribirse.",
        legalBasis: "El abandono de formación sin trámite legal ocasiona deserción automática.",
        xpReward: 0
      },
      {
        id: "c3-b",
        text: "Radicar una solicitud formal de Aplazamiento justificado ante el Centro de Formación antes de ausentarse.",
        isCorrect: true,
        consequence: "¡Trámite exitoso! El centro suspende temporalmente su matrícula de forma legal (hasta por 6 meses) y podrá solicitar su reingreso sin perder lo avanzado.",
        legalBasis: "Acuerdo 009 de 2024: El aprendiz tiene derecho a solicitar aplazamiento debidamente soportado.",
        xpReward: 150
      },
      {
        id: "c3-c",
        text: "Pagarle a un amigo de la ficha para que le firme las listas de asistencia todos los días.",
        isCorrect: false,
        consequence: "Incurren ambos en falta disciplinaria gravísima por falsedad en documento y suplantación de identidad.",
        legalBasis: "Falsificar firmas de asistencia o suplantar es causal de cancelación de matrícula.",
        xpReward: 0
      }
    ]
  },
  {
    id: "caso-4",
    title: "Discrepancia en la Evaluación de un Resultado de Aprendizaje",
    character: "Laura",
    category: "Derecho",
    role: "Aprendiz de Gestión Contable y Tributaria",
    scenario: "Laura recibió una calificación 'No Aprobado' en un resultado. Al revisar la rúbrica, observa que cumplió con el 100% de los criterios y sospecha que hubo un error de digitación. El instructor no responde sus mensajes informales por WhatsApp. ¿Cuál es el paso formal reglamentario?",
    choices: [
      {
        id: "c4-a",
        text: "Radicar respetuosamente una solicitud escrita de revisión de evaluación ante el instructor o la coordinación académica dentro de los términos establecidos.",
        isCorrect: true,
        consequence: "¡Derecho ejercido correctamente! El reglamento garantiza la revisión objetiva de evaluaciones y la designación de un segundo evaluador si persiste la diferencia.",
        legalBasis: "Acuerdo 009 de 2024: Derecho a la evaluación objetiva y revisión justificada dentro de los tiempos reglamentarios.",
        xpReward: 150
      },
      {
        id: "c4-b",
        text: "Publicar en redes sociales que el SENA y los instructores son corruptos e injustos.",
        isCorrect: false,
        consequence: "Afecta el buen nombre de la institución e incurre en falta disciplinaria por calumnia e injuria sin haber agotado los canales institucionales.",
        legalBasis: "El reglamento exige respeto y el uso de los conductos regulares institucionales.",
        xpReward: 0
      },
      {
        id: "c4-c",
        text: "Resignarse y repetir todo el programa de formación desde el primer trimestre.",
        isCorrect: false,
        consequence: "Innecesario. Los aprendices cuentan con planes de mejoramiento y segundas revisiones sin costo alguno.",
        legalBasis: "El aprendiz tiene derecho al debido proceso y a planes de mejoramiento concertados.",
        xpReward: 10
      }
    ]
  },
  {
    id: "caso-5",
    title: "Elección de Alternativa para la Etapa Productiva",
    character: "Andrés",
    category: "Etapa Productiva",
    role: "Aprendiz de Producción Agropecuaria Ecológica",
    scenario: "Andrés finalizó su etapa lectiva y desea desarrollar su propia unidad productiva de cultivo hidropónico con sus compañeros de región, en lugar de buscar un contrato en una empresa tradicional en la capital. ¿Es válida esta alternativa para titularse?",
    choices: [
      {
        id: "c5-a",
        text: "No, el SENA únicamente reconoce el Contrato de Aprendizaje empresarial como forma válida de etapa productiva.",
        isCorrect: false,
        consequence: "Falso. La ley y el reglamento estipulan diversas alternativas válidas de etapa práctica.",
        legalBasis: "El Acuerdo 009 de 2024 contempla múltiples modalidades para culminar la formación.",
        xpReward: 0
      },
      {
        id: "c5-b",
        text: "Sí, a través de la alternativa de 'Proyecto Productivo', con el acompañamiento de instructores de emprendimiento y el centro de formación.",
        isCorrect: true,
        consequence: "¡Excelente iniciativa! Andrés puede certificar su etapa productiva creando impacto real en su territorio mediante Fondo Emprender o desarrollo propio.",
        legalBasis: "Acuerdo 009 de 2024: El Proyecto Productivo es una alternativa oficial para aplicar las competencias formativas.",
        xpReward: 150
      },
      {
        id: "c5-c",
        text: "Sí, pero debe hacerlo en secreto sin informar al SENA y presentar un certificado falso al final.",
        isCorrect: false,
        consequence: "La falsificación de soportes conduce a la cancelación de matrícula e investigaciones penales.",
        legalBasis: "Toda alternativa productiva debe estar previamente concertada, registrada y legalizada ante el centro.",
        xpReward: 0
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q-1",
    moduleId: "mod-1",
    question: "¿Cuál es la norma actual expedida por el Consejo Directivo Nacional que rige los derechos y deberes del Aprendiz SENA?",
    options: [
      "Acuerdo 007 de 2012 (versión original)",
      "Acuerdo 009 de 2024",
      "Decreto 1072 de 2015",
      "Resolución 2143 de 2019"
    ],
    correctIndex: 1,
    explanation: "El Acuerdo 009 de 2024 es el nuevo Reglamento del Aprendiz SENA que actualiza y deroga de manera integral acuerdos anteriores para armonizarlos con las nuevas leyes y modalidades formativas.",
    legalArticle: "Acuerdo 009 de 2024 - Artículo derogatorio y vigencia"
  },
  {
    id: "q-2",
    moduleId: "mod-1",
    question: "La formación profesional impartida por el SENA en todas sus sedes y modalidades se caracteriza por ser:",
    options: [
      "Pagada mensualmente con descuento tributario",
      "Totalmente gratuita y sin cobro de formularios o intermediarios",
      "Financiada obligatoriamente con créditos educativos de libranza",
      "Gratuita solo para los primeros 3 meses de prueba"
    ],
    correctIndex: 1,
    explanation: "Por mandato de la Ley 119 de 1994 y los principios rectores institucionales, los programas de formación profesional del SENA son 100% gratuitos.",
    legalArticle: "Ley 119 de 1994 y Principios Institucionales del SENA"
  },
  {
    id: "q-3",
    moduleId: "mod-2",
    question: "¿En qué plazo máximo tiene derecho el aprendiz a conocer los resultados y retroalimentación de sus evaluaciones?",
    options: [
      "Hasta el último día del trimestre de formación",
      "No mayor a ocho (8) días hábiles posteriores a su presentación",
      "Quince (15) días calendario",
      "Treinta (30) días hábiles por correo postal"
    ],
    correctIndex: 1,
    explanation: "El reglamento garantiza al aprendiz el derecho a conocer oportunamente el resultado de sus evaluaciones dentro de los ocho (8) días hábiles siguientes para propiciar mejoras pedagógicas inmediatas.",
    legalArticle: "Acuerdo 009 de 2024 - Capítulo de Derechos Académicos"
  },
  {
    id: "q-4",
    moduleId: "mod-2",
    question: "Si un aprendiz presenta una condición de discapacidad, ¿qué derecho especial le garantiza el Acuerdo 009 de 2024?",
    options: [
      "Exención de asistir a los ambientes de formación",
      "Aprobación automática de resultados sin presentar evidencias",
      "Derecho a ajustes razonables y accesibilidad en su proceso formativo",
      "Realizar el programa en la mitad del tiempo establecido"
    ],
    correctIndex: 2,
    explanation: "El nuevo reglamento incorpora de manera vinculante el enfoque diferencial y el derecho a solicitar e implementar ajustes razonables para asegurar la equidad e inclusión real.",
    legalArticle: "Acuerdo 009 de 2024 - Enfoque Diferencial e Inclusión"
  },
  {
    id: "q-5",
    moduleId: "mod-2",
    question: "¿Qué medida preventiva y pedagógica debe aplicarse cuando un aprendiz no evidencia el logro de un resultado de aprendizaje?",
    options: [
      "Cancelación inmediata de la matrícula con sanción de dos años",
      "Concertación de un Plan de Mejoramiento Académico",
      "Llamado de atención verbal ante toda la comunidad de la sede",
      "Cobro de una multa económica para poder habilitar la prueba"
    ],
    correctIndex: 1,
    explanation: "El Plan de Mejoramiento es una medida formativa concertada que define actividades pedagógicas complementarias para alcanzar los logros antes de iniciar cualquier proceso sancionatorio.",
    legalArticle: "Acuerdo 009 de 2024 - Medidas Formativas"
  },
  {
    id: "q-6",
    moduleId: "mod-3",
    question: "En cuanto al uso de herramientas digitales e Inteligencia Artificial generativa, ¿cuál es el deber del aprendiz?",
    options: [
      "Está prohibido usar internet o herramientas tecnológicas en el SENA",
      "Usarlas éticamente, citando las fuentes y garantizando la autoría propia",
      "Presentar el texto generado por IA como obra original sin citar",
      "Compartir contraseñas con otros aprendices para realizar entregas conjuntas"
    ],
    correctIndex: 1,
    explanation: "El aprendiz debe garantizar la integridad académica y la honestidad intelectual; el uso de IA es bienvenido como apoyo, siempre y cuando se transparente y cite adecuadamente.",
    legalArticle: "Acuerdo 009 de 2024 - Deberes de Integridad Académica"
  },
  {
    id: "q-7",
    moduleId: "mod-3",
    question: "¿Qué ley nacional se incorpora de manera prioritaria en el Acuerdo 009 de 2024 para la atención y prevención de violencias y acoso sexual?",
    options: [
      "Ley 100 de 1993",
      "Ley 2365 de 2024",
      "Ley 1429 de 2010",
      "Ley 80 de 1993"
    ],
    correctIndex: 1,
    explanation: "La Ley 2365 de 2024 define lineamientos de prevención, atención integral y sanción del acoso sexual en el ámbito laboral y en las instituciones de educación y formación profesional.",
    legalArticle: "Acuerdo 009 de 2024 & Ley 2365 de 2024"
  },
  {
    id: "q-8",
    moduleId: "mod-4",
    question: "¿Cuál de las siguientes acciones constituye una falta de carácter disciplinario en el SENA?",
    options: [
      "Portar el carné en un lugar visible de la camiseta",
      "Participar como candidato a vocero o representante de aprendices",
      "Ingresar, comercializar o consumir bebidas alcohólicas o sustancias psicoactivas en el centro",
      "Utilizar la biblioteca virtual para investigar sobre el proyecto productivo"
    ],
    correctIndex: 2,
    explanation: "El ingreso, consumo o venta de alcohol y sustancias psicoactivas en instalaciones del SENA o asistir bajo sus efectos es una prohibición expresa y falta disciplinaria grave/gravísima.",
    legalArticle: "Acuerdo 009 de 2024 - Prohibiciones Disciplinarias"
  },
  {
    id: "q-9",
    moduleId: "mod-4",
    question: "¿Cuándo se configura la causal de 'Deserción' en un programa de formación?",
    options: [
      "Cuando el aprendiz llega 5 minutos tarde a una clase presencial",
      "Cuando no asiste durante tres (3) días hábiles consecutivos sin causa justificada y no responde al requerimiento oficial",
      "Cuando pierde una evaluación y solicita revisión al segundo calificador",
      "Cuando solicita traslado de centro por cambio de domicilio"
    ],
    correctIndex: 1,
    explanation: "La deserción se produce por inasistencia injustificada de tres (3) días consecutivos, tras lo cual se realiza el llamado formal para que el aprendiz justifique antes del cierre administrativo.",
    legalArticle: "Acuerdo 009 de 2024 - Causales de Deserción"
  },
  {
    id: "q-10",
    moduleId: "mod-4",
    question: "¿Cuál de las siguientes NO es una alternativa válida para la realización de la Etapa Productiva?",
    options: [
      "Contrato de Aprendizaje con empresa patrocinadora",
      "Proyecto Productivo formativo o apoyo a Fondo Emprender",
      "Pasantía empresarial con afiliación a ARL",
      "Pagar una suma de dinero al centro de formación para convalidar la práctica"
    ],
    correctIndex: 3,
    explanation: "En ningún caso se permite el pago de dinero o convalidaciones económicas para suplir la etapa productiva. Debe ejecutarse mediante una de las alternativas legales establecidas.",
    legalArticle: "Acuerdo 009 de 2024 - Alternativas de Etapa Productiva"
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: "badge-onboarding",
    name: "Bienvenida SENA",
    description: "Completaste el registro e iniciaste la ruta de inducción.",
    icon: "Sparkles",
    unlocked: true,
    unlockedAt: "Hoy"
  },
  {
    id: "badge-rights",
    name: "Defensor de Derechos",
    description: "Dominaste todos los derechos académicos y de bienestar del Acuerdo 009 de 2024.",
    icon: "Shield",
    unlocked: false
  },
  {
    id: "badge-duties",
    name: "Embajador de la Ética",
    description: "Comprendiste los deberes, el uso responsable de IA y la cultura de respeto.",
    icon: "CheckCircle",
    unlocked: false
  },
  {
    id: "badge-dilemma-master",
    name: "Estratega de Convivencia",
    description: "Resolviste con éxito los dilemas éticos y situacionales del simulador.",
    icon: "Brain",
    unlocked: false
  },
  {
    id: "badge-certified",
    name: "Aprendiz Certificado",
    description: "Aprobaste la evaluación final de inducción y obtuviste tu certificación oficial.",
    icon: "Award",
    unlocked: false
  }
];

export const REGIONAL_CENTERS = [
  { regional: "Distrito Capital", centers: ["Centro de Tecnologías del Transporte", "Centro de Gestión de Mercados, Logística y TIC", "Centro de Servicios Financieros", "Centro Electricidad, Electrónica y Telecomunicaciones"] },
  { regional: "Antioquia", centers: ["Centro de Formación en Diseño, Confección y Moda", "Centro Tecnológico del Mobiliario", "Centro de los Recursos Naturales Renovables La Salada"] },
  { regional: "Valle del Cauca", centers: ["Centro de Electricidad y Automatización Industrial (CEAI)", "Centro de la Construcción", "Centro Náutico Pesquero de Buenaventura"] },
  { regional: "Santander", centers: ["Centro de Servicios Empresariales y Turísticos", "Centro Industrial del Diseño y la Manufactura", "Centro Agroturístico de San Gil"] },
  { regional: "Atlántico", centers: ["Centro Colombo Alemán", "Centro de Comercio y Servicios", "Centro para el Desarrollo Agroecológico"] },
  { regional: "Cundinamarca", centers: ["Centro de Biotecnología Agropecuaria - Mosquera", "Centro de Desarrollo Agroindustrial y Empresarial - Villeta"] },
  { regional: "Caldas", centers: ["Centro de Procesos Industriales y Construcción", "Centro para la Formación Cafetera"] }
];

export const GLOSSARY_TERMS = [
  {
    term: "Acuerdo 009 de 2024",
    category: "Normatividad",
    definition: "Reglamento del Aprendiz SENA vigente expedido por el Consejo Directivo Nacional que deroga los acuerdos 007 de 2012, 002 de 2014 y afines, regulando derechos, deberes, prohibiciones, medidas y convivencia."
  },
  {
    term: "Ajuste Razonable",
    category: "Inclusión",
    definition: "Modificaciones y adaptaciones necesarias y adecuadas requeridas para garantizar a los aprendices con discapacidad el goce o ejercicio en igualdad de condiciones de su formación integral."
  },
  {
    term: "Aplazamiento",
    category: "Novedad",
    definition: "Solicitud motivada y formal radicada por el aprendiz para suspender temporalmente su proceso formativo por un período de hasta 6 meses (prorrogable por causa justificada comprobada)."
  },
  {
    term: "Comité de Evaluación y Seguimiento",
    category: "Debido Proceso",
    definition: "Órgano colegiado del Centro de Formación que analiza los casos académicos o disciplinarios remitidos por instructores, garantizando el derecho a la defensa y recomendando las medidas o sanciones formativas."
  },
  {
    term: "Contrato de Aprendizaje",
    category: "Etapa Productiva",
    definition: "Forma especial de vinculación de carácter formativo entre una empresa patrocinadora y el aprendiz SENA, donde se recibe apoyo económico de sostenimiento y cobertura en EPS y ARL."
  },
  {
    term: "Deserción",
    category: "Novedad",
    definition: "Abandono injustificado del proceso de formación durante tres (3) días hábiles consecutivos en modalidad presencial o virtual sin respuesta al requerimiento institucional en los 5 días posteriores."
  },
  {
    term: "Etapa Lectiva y Productiva",
    category: "Estructura Formativa",
    definition: "Las dos fases fundamentales de la Formación Profesional Integral: la primera dedicada a la fundamentación teórica, tecnológica y práctica en ambientes de aprendizaje; la segunda a la aplicación real en el entorno productivo."
  },
  {
    term: "Ley 2365 de 2024",
    category: "Convivencia",
    definition: "Marco legislativo colombiano que dicta medidas integrales para la prevención, detección, atención y sanción del acoso sexual en el contexto laboral y en instituciones educativas y de formación técnica."
  },
  {
    term: "Plan de Mejoramiento",
    category: "Medida Formativa",
    definition: "Acción concertada entre el instructor y el aprendiz mediante acta formativa con el objetivo de alcanzar los resultados de aprendizaje no logrados o rectificar conductas comportamentales antes de medidas sancionatorias."
  },
  {
    term: "Vocero de Ficha",
    category: "Representación",
    definition: "Aprendiz elegido democráticamente por sus compañeros de grupo para actuar como canal de comunicación constructiva, proponer iniciativas y participar en espacios de concertación del Centro."
  }
];
