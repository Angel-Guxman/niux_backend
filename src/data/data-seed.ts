import * as bcrypt from 'bcrypt';
interface SeedProduct {
  description: string;
  images: string[];
  stock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  rating?: number;
  shipping?: string;
  category: any;
  brand: any;
}

type ValidTypes =
  | 'Tarjeta Gráfica'
  | 'Procesadores'
  | 'Software'
  | 'RAM'
  | 'Motherboard'
  | 'Almacenamiento'
  | 'Gaming'
  | 'Teclado'
  | 'Ratón'
  | 'Monitor'
  | 'Ratón'
  | 'Monitor'
  | 'Auriculares';

interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedBrand {
  id: string;
  name: string;
  description: string;
}

interface SeedCategory {
  id: string;
  name: ValidTypes;
  description: string;
}

interface SeedData {
  users: SeedUser[];
  brands: SeedBrand[];
  categories: SeedCategory[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test@gmail.com',
      fullName: 'Test User',
      password: bcrypt.hashSync('Linux77?', 10),
      roles: ['admin'],
    },

    {
      email: 'linux@gmail.com',
      fullName: 'Linux User',
      password: bcrypt.hashSync('Linux77?', 10),
      roles: ['user'],
    },
  ],
  brands: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'NVIDIA',
      description:
        'Fabricante líder de tarjetas gráficas y tecnologías de visualización.',
    },
    {
      id: '21f7f8de-8051-4b37-a1d7-6a3fc785c8db',
      name: 'AMD',
      description:
        'Empresa especializada en procesadores y tarjetas gráficas para PC y consolas de videojuegos.',
    },
    {
      id: '4e29fa14-7082-4d0c-9124-8e2b63014998',
      name: 'Corsair',
      description:
        'Proveedor de componentes y periféricos de alta calidad para PC gaming y entusiastas de tecnología.',
    },
    {
      id: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
      name: 'ASUS',
      description:
        'Fabricante de hardware y electrónicos para computadoras y dispositivos móviles.',
    },
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      name: 'LG',
      description: 'Fabricante de electrónicos y electrodomésticos.',
    },
    {
      id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      name: 'Logitech',
      description: 'Fabricante de periféricos y dispositivos electrónicos.',
    },
    {
      id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
      name: 'G. Skill',
      description:
        'Fabricante de memorias RAM y otros componentes de computadoras.',
    },
    {
      id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
      name: 'MSI',
      description:
        'Fabricante de hardware para computadoras, como placas base y tarjetas gráficas.',
    },
    {
      id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
      name: 'HyperX',
      description:
        'Marca de periféricos y componentes de alto rendimiento para gaming.',
    },
    {
      id: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
      name: 'Crucial',
      description:
        'Fabricante de componentes de almacenamiento, incluyendo SSD y memoria RAM.',
    },
    {
      id: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
      name: 'Dell',
      description:
        'Empresa de tecnología que fabrica computadoras, servidores y otros productos electrónicos.',
    },
    {
      id: '6ba7b817-9dad-11d1-80b4-00c04fd430c8',
      name: 'Adobe',
      description:
        'Desarrollador de software, incluyendo Photoshop, Illustrator y otros programas creativos.',
    },
    {
      id: '6ba7b818-9dad-11d1-80b4-00c04fd430c8',
      name: 'Razer',
      description:
        'Fabricante de periféricos y dispositivos gaming de alta gama.',
    },
    {
      id: '6ba7b819-9dad-11d1-80b4-00c04fd430c8',
      name: 'Samsung',
      description:
        'Empresa multinacional de tecnología que fabrica una variedad de productos electrónicos.',
    },
    {
      id: '6ba7b820-9dad-11d1-80b4-00c04fd430c8',
      name: 'SteelSeries',
      description: 'Fabricante de periféricos y accesorios gaming.',
    },
    {
      id: '6ba7b821-9dad-11d1-80b4-00c04fd430c8',
      name: 'Microsoft',
      description:
        'Empresa tecnológica que desarrolla software, hardware y servicios.',
    },
  ],
  categories: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Tarjeta Gráfica',
      description:
        'Componentes que procesan datos para producir imágenes en un monitor.',
    },
    {
      id: '21f7f8de-8051-4b37-a1d7-6a3fc785c8db',
      name: 'Procesadores',
      description:
        'Unidad central de procesamiento que ejecuta instrucciones de programas.',
    },
    {
      id: '4e29fa14-7082-4d0c-9124-8e2b63014998',
      name: 'Software',
      description:
        'Programas y aplicaciones utilizados para realizar tareas en un ordenador.',
    },
    {
      id: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
      name: 'RAM',
      description:
        'Memoria de acceso aleatorio utilizada para almacenar datos y programas en uso.',
    },
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      name: 'Motherboard',
      description:
        'Placa base que conecta todos los componentes del ordenador.',
    },
    {
      id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      name: 'Almacenamiento',
      description:
        'Dispositivos de almacenamiento como SSD, HDD, y unidades de disco óptico.',
    },
    {
      id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
      name: 'Gaming',
      description:
        'Productos y accesorios especializados para juegos de computadora.',
    },
    {
      id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
      name: 'Teclado',
      description:
        'Dispositivo de entrada que utiliza teclas para introducir datos en una computadora.',
    },
    {
      id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
      name: 'Ratón',
      description:
        'Dispositivo de entrada que se utiliza para controlar el puntero en una computadora.',
    },
    {
      id: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
      name: 'Monitor',
      description:
        'Dispositivo de salida que muestra imágenes y texto generados por un ordenador.',
    },
    {
      id: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
      name: 'Auriculares',
      description:
        'Dispositivos de audio utilizados para escuchar sonido en un ordenador o dispositivo de juego.',
    },
  ],
  products: [
    {
      description:
        'La tarjeta gráfica NVIDIA GeForce RTX 3080 Ti ofrece un rendimiento de juego increíble con tecnología de trazado de rayos en tiempo real y núcleos Tensor para inteligencia artificial avanzada.',
      images: ['rtx_3080_ti_front.jpg', 'rtx_3080_ti_back.jpg'],
      stock: 10,
      price: 899.0,

      slug: 'nvidia_geforce_rtx_3080_ti',
      tags: ['gaming', 'high-end'],
      title: 'NVIDIA GeForce RTX 3080 Ti',
      rating: 4.5,
      shipping: 'Envío Gratis',
      brand: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      category: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    {
      description:
        'El procesador AMD Ryzen 9 5900X ofrece un rendimiento multicore excepcional y velocidades de reloj impresionantes para una experiencia de computación sin problemas.',
      images: ['ryzen_5900x.jpg', 'ryzen_5900x_view.jpg'],
      stock: 15,
      price: 549.0,
      brand: '21f7f8de-8051-4b37-a1d7-6a3fc785c8db',
      category: '21f7f8de-8051-4b37-a1d7-6a3fc785c8db',
      slug: 'amd_ryzen_9_5900x',

      tags: ['gaming', 'high-end'],
      title: 'AMD Ryzen 9 5900X',
      rating: 4.8,
      shipping: 'Envío Gratis',
    },
    {
      description:
        'La memoria RAM Corsair Vengeance RGB Pro DDR4 ofrece un rendimiento de alta velocidad y una iluminación RGB vibrante para mejorar la estética de tu computadora.',
      images: ['corsair_ram.jpg', 'corsair_ram_view.jpg'],
      stock: 20,
      price: 199.5,
      slug: 'corsair_vengeance_rgb_pro',
      tags: ['rgb', 'high-performance'],
      title: 'Corsair Vengeance RGB Pro DDR4',
      rating: 4.2,
      shipping: 'Envío Gratis',
      brand: '4e29fa14-7082-4d0c-9124-8e2b63014998',
      category: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
    },
    {
      description:
        'La placa base ASUS ROG Strix B550-F Gaming tiene un diseño robusto y ofrece una amplia gama de características para satisfacer las necesidades de los jugadores y los creadores de contenido.',
      images: ['asus_b550f.jpg', 'asus_b550f_view.jpg'],
      stock: 12,
      price: 279.25,
      slug: 'asus_rog_strix_b550f',

      tags: ['gaming', 'high-end'],
      title: 'ASUS ROG Strix B550-F Gaming',
      rating: 4.6,
      shipping: 'Envío Gratis',
      brand: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
      category: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El SSD Samsung 970 EVO Plus ofrece velocidades de lectura y escritura ultrarrápidas, lo que lo convierte en una excelente opción para mejorar el rendimiento de tu sistema.',
      images: ['samsung_970_evo_plus.jpg', '.samsung_970_evo_plus_view.jpg'],
      stock: 25,
      price: 149.5,
      slug: 'samsung_970_evo_plus',

      tags: ['ssd', 'high-performance'],
      title: 'Samsung 970 EVO Plus SSD',
      rating: 4.7,
      shipping: 'Envío Gratis',
      brand: '6ba7b819-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El teclado mecánico Razer BlackWidow Elite ofrece interruptores mecánicos Razer de calidad superior, retroiluminación RGB personalizable y un reposamuñecas ergonómico para sesiones de juego prolongadas.',
      images: ['razer_blackwidow_elite.jpg', 'razer_blackwidow_elite_view.jpg'],
      stock: 18,
      price: 169.15,
      slug: 'razer_blackwidow_elite',
      tags: ['gaming', 'rgb'],
      title: 'Razer BlackWidow Elite',
      rating: 4.4,
      shipping: 'Envío Gratis',
      brand: '6ba7b818-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El ratón gaming Logitech G Pro X Superlight es increíblemente ligero y cuenta con un sensor HERO de alta precisión para una experiencia de juego sin retrasos.',
      images: ['logitech_g_pro_x.jpg', 'logitech_g_pro_x_view.jpg'],
      stock: 30,
      price: 99.99,
      slug: 'logitech_g_pro_x_superlight',
      tags: ['gaming', 'wireless'],
      title: 'Logitech G Pro X Superlight',
      rating: 4.9,
      shipping: 'Envío Gratis',
      brand: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El monitor ASUS ROG Swift PG279QZ ofrece una alta frecuencia de actualización de 165 Hz y una resolución Quad HD para una experiencia de juego suave y detallada.',
      images: ['asus_pg279qz.jpg', 'asus_pg279qz_back.jpg'],
      stock: 8,
      price: 599.45,
      slug: 'asus_rog_swift_pg279qz',
      tags: ['gaming', 'high-refresh-rate'],
      title: 'ASUS ROG Swift PG279QZ',
      rating: 4.3,
      shipping: 'Envío Gratis',
      brand: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
      category: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'Los auriculares inalámbricos SteelSeries Arctis Pro ofrecen un sonido de alta fidelidad y comodidad durante todo el día para una experiencia de juego inigualable.',
      images: [
        'steelseries_arctis_pro.jpg',
        'steelseries_arctis_pro_front.jpg',
      ],
      stock: 22,
      price: 249.2,
      slug: 'steelseries_arctis_pro_wireless',
      tags: ['wireless', 'high-quality-audio'],
      title: 'SteelSeries Arctis Pro Wireless',
      rating: 4.1,
      shipping: 'Envío Gratis',
      brand: '6ba7b820-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El software Adobe Creative Cloud te brinda acceso a todas las aplicaciones de Adobe para diseñar, editar y crear contenido creativo de alta calidad.',
      images: ['adobe_creative_cloud.jpg'],
      stock: 50,
      price: 599.0,
      slug: 'adobe_creative_cloud',
      tags: ['creative', 'subscription'],
      title: 'Adobe Creative Cloud',
      rating: 4.5,
      shipping: 'Envío Gratis',
      brand: '6ba7b817-9dad-11d1-80b4-00c04fd430c8',
      category: '4e29fa14-7082-4d0c-9124-8e2b63014998',
    },
    {
      description:
        'Las memorias RAM Corsair Vengeance LPX DDR4 ofrecen un rendimiento confiable y una amplia compatibilidad con placas base para satisfacer tus necesidades de memoria.',
      images: ['corsair_lpx_ram.jpg', 'corsair_lpx_ram_back.jpg'],
      stock: 30,
      price: 89.0,
      slug: 'corsair_vengeance_lpx',
      tags: ['low-profile', 'value'],
      title: 'Corsair Vengeance LPX DDR4 RAM',
      rating: 4.2,
      shipping: 'Envío Gratis',
      brand: '4e29fa14-7082-4d0c-9124-8e2b63014998',
      category: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
    },
    {
      description:
        'El teclado mecánico Logitech G Pro X es personalizable con interruptores intercambiables y luces RGB para satisfacer las preferencias de los jugadores más exigentes.',
      images: [
        'logitech_g_pro_x_keyboard.jpg',
        'logitech_g_pro_x_keyboard_back.jpg',
      ],
      stock: 15,
      price: 129.15,
      slug: 'logitech_g_pro_x_keyboard',
      tags: ['gaming', 'customizable'],
      title: 'Logitech G Pro X Mechanical Keyboard',
      rating: 4.7,
      shipping: 'Envío Gratis',
      brand: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El ratón inalámbrico Logitech MX Master 3 es ideal para la productividad, con un sensor de alta precisión y una rueda de desplazamiento MagSpeed para un flujo de trabajo sin problemas.',
      images: ['logitech_mx_master_3.jpg', 'logitech_mx_master_3_front.jpg'],
      stock: 20,
      price: 99.55,
      slug: 'logitech_mx_master_3',
      tags: ['wireless', 'productivity'],
      title: 'Logitech MX Master 3 Wireless Mouse',
      rating: 4.8,
      shipping: 'Envío Gratis',
      brand: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El monitor Dell Ultrasharp U2719D ofrece una calidad de imagen excepcional con una pantalla QHD de 27 pulgadas y amplias opciones de conectividad.',
      images: ['dell_ultrasharp_u2719d.jpg', 'dell_ultrasharp_u2719d_back.jpg'],
      stock: 10,
      price: 349.0,
      slug: 'dell_ultrasharp_u2719d',
      tags: ['professional', 'QHD'],
      title: 'Dell Ultrasharp U2719D Monitor',
      rating: 4.6,
      shipping: 'Envío Gratis',
      brand: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'Los auriculares HyperX Cloud Alpha Pro ofrecen un sonido envolvente, comodidad excepcional y un micrófono desmontable para juegos y comunicaciones de alta calidad.',
      images: ['hyperx_cloud_alpha.jpg', 'hyperx_cloud_alpha_box.jpg'],
      stock: 25,
      price: 89.0,
      slug: 'hyperx_cloud_alpha_pro',
      tags: ['gaming', 'high-quality-audio'],
      title: 'HyperX Cloud Alpha Pro Headset',
      rating: 4.5,
      shipping: 'Envío Gratis',
      brand: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'La tarjeta gráfica AMD Radeon RX 6900 XT es una opción poderosa para jugadores y creadores de contenido con un rendimiento gráfico excepcional.',
      images: ['amd_rx_6900_xt.jpg', 'amd_rx_6900_xt_view.jpg'],
      stock: 8,
      price: 799.5,
      slug: 'amd_radeon_rx_6900_xt',
      tags: ['gaming', 'high-end'],
      title: 'AMD Radeon RX 6900 XT',
      rating: 4.9,
      shipping: 'Envío Gratis',
      brand: '21f7f8de-8051-4b37-a1d7-6a3fc785c8db',
      category: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    {
      description:
        'El SSD Crucial MX500 ofrece una mejora significativa en el rendimiento de almacenamiento de tu computadora con velocidades de lectura/escritura rápidas y confiabilidad.',
      images: ['crucial_mx500.jpg', 'crucial_mx500_view.jpg'],
      stock: 15,
      price: 110.55,
      slug: 'crucial_mx500',
      tags: ['ssd', 'reliable'],
      title: 'Crucial MX500 SSD',
      rating: 4.4,
      shipping: 'Envío Gratis',
      brand: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El software Microsoft Windows 10 Pro es la elección ideal para entornos profesionales, ofreciendo características avanzadas de seguridad y productividad.',
      images: ['windows_10_pro.jpg', 'windows_10_pro_disk.jpg'],
      stock: 50,
      price: 199,
      slug: 'microsoft_windows_10_pro',

      tags: ['operating-system', 'professional'],
      title: 'Microsoft Windows 10 Pro',
      rating: 4.5,
      shipping: 'Envío Gratis',
      brand: '6ba7b821-9dad-11d1-80b4-00c04fd430c8',
      category: '4e29fa14-7082-4d0c-9124-8e2b63014998',
    },
    {
      description:
        'La placa base MSI MPG B550 Gaming Edge WiFi ofrece un rendimiento confiable y características de juego, incluyendo conectividad WiFi 6.',
      images: ['msi_b550_gaming_edge_wifi.jpg'],
      stock: 12,
      price: 159.0,
      slug: 'msi_mpg_b550_gaming_edge_wifi',

      tags: ['gaming', 'wifi'],
      title: 'MSI MPG B550 Gaming Edge WiFi',
      rating: 4.7,
      shipping: 'Envío Gratis',
      brand: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'Las memorias RAM G.Skill Ripjaws V DDR4 ofrecen un rendimiento sólido y una amplia variedad de configuraciones para adaptarse a tus necesidades de memoria.',
      images: ['g_skill_ripjaws_ram.jpg'],
      stock: 25,
      price: 79.0,
      slug: 'g_skill_ripjaws_v_ddr4',
      tags: ['value', 'performance'],
      title: 'G.Skill Ripjaws V DDR4 RAM',
      rating: 4.2,
      shipping: 'Envío Gratis',
      brand: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
      category: '5816d3ca-1f22-4fc0-951f-a8d53cb4a1d4',
    },
    {
      description:
        'El teclado mecánico Corsair K95 RGB Platinum XT es un teclado premium con interruptores Cherry MX, iluminación RGB dinámica y controles dedicados para multimedia.',
      images: [
        'corsair_k95_rgb_platinum_xt.jpg',
        'corsair_k95_rgb_platinum_xt_back.jpg',
      ],
      stock: 10,
      price: 190.99,
      slug: 'corsair_k95_rgb_platinum_xt',
      tags: ['gaming', 'rgb'],
      title: 'Corsair K95 RGB Platinum XT Mechanical Keyboard',
      rating: 4.8,
      shipping: 'Envío Gratis',
      brand: '4e29fa14-7082-4d0c-9124-8e2b63014998',
      category: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El ratón Logitech G502 HERO es un ratón gaming con un sensor de alta precisión y un diseño ergonómico que se adapta perfectamente a la mano.',
      images: ['logitech_g502_hero.jpg', 'logitech_g502_hero_view.jpg'],
      stock: 30,
      price: 70.0,
      slug: 'logitech_g502_hero',
      tags: ['gaming', 'hero-sensor'],
      title: 'Logitech G502 HERO Gaming Mouse',
      rating: 4.7,
      shipping: 'Envío Gratis',
      brand: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
    },
    {
      description:
        'El monitor LG 27GL83A-B ofrece una experiencia de juego suave con una alta frecuencia de actualización de 144 Hz y una rápida respuesta de 1 ms para minimizar el desenfoque de movimiento.',
      images: ['lg_27gl83a_b.jpg', 'lg_27gl83a_b_view.jpg'],
      stock: 18,
      price: 499.0,
      slug: 'lg_27gl83a_b',
      tags: ['gaming', 'high-refresh-rate'],
      title: 'LG 27GL83A-B Gaming Monitor',
      rating: 4.6,
      shipping: 'Envío Gratis',
      brand: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      category: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
    },
  ],
};
