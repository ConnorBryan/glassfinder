import { statesArray as usStates } from "./us-states";

export default {
  appName: "Glassfinder",
  iconSet: {
    shop: "cart",
    artist: "paint brush",
    brand: "building",
    piece: "puzzle"
  },
  usStates,
  placeholderImage: "https://placehold.it/400x400",
  navigationItems: [
    {
      key: "A",
      icon: "question",
      to: "/help",
      title: "Help"
    },
    {
      key: "B",
      icon: "users",
      to: "/about",
      title: "About"
    },
    {
      key: "E",
      icon: "envelope",
      to: "/contact",
      title: "Contact"
    },
    {
      key: "C",
      icon: "cart",
      to: "/explore-shops",
      title: "Shops"
    },
    {
      key: "F",
      icon: "puzzle",
      to: "/explore-pieces",
      title: "Pieces"
    },
    {
      key: "D",
      icon: "building",
      to: "/explore-brands",
      title: "Brands"
    }
  ],
  pageHeaders: {
    home: {
      icon: "home",
      header: "Glassfinder",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    exploreShops: {
      icon: "cart",
      header: "Explore shops",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    explorePieces: {
      icon: "puzzle",
      header: "Explore pieces",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    exploreBrands: {
      icon: "building",
      header: "Explore brands",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    help: {
      icon: "question",
      header: "Help",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    about: {
      icon: "users",
      header: "About",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    contact: {
      icon: "envelope",
      header: "Contact us",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    }
  },
  helpTopics: [
    {
      key: "1",
      title: "Foo",
      content: "Bar"
    },
    {
      key: "2",
      title: "Foo",
      content: "Bar"
    },
    {
      key: "3",
      title: "Foo",
      content: "Bar"
    }
  ],
  about: [
    {
      key: "A",
      image: "https://placehold.it/400x400",
      name: "Connor Bryan",
      role: "Lead Developer",
      blurb:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    {
      key: "B",
      image: "https://placehold.it/400x400",
      name: "Connor Bryan",
      role: "Lead Developer",
      blurb:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    },
    {
      key: "C",
      image: "https://placehold.it/400x400",
      name: "Connor Bryan",
      role: "Lead Developer",
      blurb:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
    }
  ],
  updates: [
    {
      key: "87c98c0f-00f7-45a3-97db-eccb1b7277ee",
      image: "https://placehold.it/400x400",
      header: "Test",
      meta: "03/19/2017",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      author: "Connor Bryan"
    },
    {
      key: "08411f35-f411-4c9a-89c8-657c41f2eda6",
      image: "https://placehold.it/400x400",
      header: "Test",
      meta: "03/18/2017",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      author: "Connor Bryan"
    },
    {
      key: "26d3468e-6ac3-4f33-838b-6c184b5fac62",
      image: "https://placehold.it/400x400",
      header: "Test",
      meta: "03/17/2017",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      author: "Connor Bryan"
    }
  ],
  shops: [
    {
      key: "87c98c0f-00f7-45a3-97db-eccb1b7277ee",
      image: "https://placehold.it/400x400",
      name: "Connor's Corner",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      email: "cchromium@gmail.com",
      phone: "(214) 677-6265",
      street: "3 Haynes Circle",
      city: "Terrell",
      state: "TX",
      zip: "75160"
    },
    {
      key: "2",
      image: "https://placehold.it/400x400",
      name: "Connor's Corner",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      email: "cchromium@gmail.com",
      phone: "(214) 677-6265",
      street: "3 Haynes Circle",
      city: "Terrell",
      state: "TX",
      zip: "75160"
    },
    {
      key: "3",
      image: "https://placehold.it/400x400",
      name: "Connor's Corner",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      email: "cchromium@gmail.com",
      phone: "(214) 677-6265",
      street: "3 Haynes Circle",
      city: "Terrell",
      state: "TX",
      zip: "75160"
    },
    {
      key: "4",
      image: "https://placehold.it/400x400",
      name: "Connor's Corner",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      email: "cchromium@gmail.com",
      phone: "(214) 677-6265",
      street: "3 Haynes Circle",
      city: "Terrell",
      state: "TX",
      zip: "75160"
    }
  ],
  pieces: [
    {
      key: "A",
      image: "https://placehold.it/400x400",
      name: "Old Blue",
      maker: "Bob Dole",
      price: 3.2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      location: "Dallas, TX"
    },
    {
      key: "B",
      image: "https://placehold.it/400x400",
      name: "Old Yellow",
      maker: "Bob Dole",
      price: 3.2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      location: "Dallas, TX"
    },
    {
      key: "C",
      image: "https://placehold.it/400x400",
      name: "Green Monster",
      maker: "Bob Dole",
      price: 3.2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      location: "Dallas, TX"
    }
  ],
  brands: [
    {
      key: "1",
      image: "https://placehold.it/400x400",
      name: "Connor Inc.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      from: "Dallas, TX",
      site: "https://www.connorbryan.com/"
    },
    {
      key: "2",
      image: "https://placehold.it/400x400",
      name: "Connor Inc.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      from: "Dallas, TX",
      site: "https://www.connorbryan.com/"
    },
    {
      key: "3",
      image: "https://placehold.it/400x400",
      name: "Connor Inc.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
      from: "Dallas, TX",
      site: "https://www.connorbryan.com/"
    }
  ],
  footerItems: [
    {
      key: "A",
      title: "Lorem",
      href: "https://www.google.com/"
    },
    {
      key: "B",
      title: "Lorem",
      href: "https://www.google.com/"
    },
    {
      key: "C",
      title: "Lorem",
      href: "https://www.google.com/"
    }
  ]
};
