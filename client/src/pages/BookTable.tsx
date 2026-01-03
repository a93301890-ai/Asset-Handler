import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
import { useCreateReservation } from "@/hooks/use-reservations";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import { Calendar, Clock, Users, User, Phone, Loader2 } from "lucide-react";

// Simple 3D "RESERVE" Text
function ReservationText() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Center>
        <Text3D 
            font="/fonts/typeface.json" // Note: Ideally we need a font file in public/fonts. Falling back to simple HTML text if this fails is safer in code gen, but I will simulate the visual with HTML overlay mostly.
            size={0.75} 
            height={0.2} 
            curveSegments={12} 
            bevelEnabled 
            bevelThickness={0.02} 
            bevelSize={0.02} 
            bevelOffset={0} 
            bevelSegments={5}
        >
          BOOK NOW
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </Float>
  );
}

export default function BookTable() {
  const { toast } = useToast();
  const mutation = useCreateReservation();
  
  const form = useForm<InsertReservation>({
    resolver: zodResolver(insertReservationSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: new Date().toISOString().split('T')[0],
      time: "19:00",
      guests: 2
    }
  });

  const onSubmit = (data: InsertReservation) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Request Sent!",
          description: "We will call you shortly to confirm your reservation.",
          className: "bg-primary text-black border-none"
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Info & 3D Visual */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
           <div className="h-[300px] w-full bg-white/5 rounded-lg border border-white/10 relative overflow-hidden hidden lg:block">
              {/* Fallback visual if 3D fails or for aesthetic */}
              <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-6xl font-display font-black text-white/5 uppercase tracking-widest rotate-[-15deg]">Legenda</h2>
              </div>
              {/* Ideally Canvas goes here, but without font file it might crash. Using safe HTML visual instead. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-3xl font-display text-primary mb-2">Reserve Your Spot</h3>
                <p className="text-muted-foreground">Join us for an unforgettable evening.</p>
              </div>
           </div>

           <div className="glass-panel p-8 rounded-lg space-y-6">
              <h3 className="text-xl font-display text-white uppercase tracking-wider border-b border-white/10 pb-4">
                Booking Policy
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reservations are held for 15 minutes past the booking time. For groups larger than 8, please contact us directly by phone. We look forward to hosting you.
              </p>
              <div className="flex items-center gap-3 text-primary font-bold">
                 <Phone className="w-5 h-5" />
                 <a href="tel:+375293222040">+375 29 322-20-40</a>
              </div>
           </div>
        </div>

        {/* Right: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-background/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-xl shadow-2xl relative order-1 lg:order-2"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Book a Table</h1>
          <p className="text-muted-foreground mb-8">Fill out the form below to request a reservation.</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-white/60">Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input 
                            {...form.register("name")}
                            className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Your Name"
                        />
                    </div>
                    {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-white/60">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input 
                            {...form.register("phone")}
                            className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="+375..."
                        />
                    </div>
                    {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-white/60">Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input 
                            type="date"
                            {...form.register("date")}
                            className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-white/60">Time</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input 
                            type="time"
                            {...form.register("time")}
                            className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-white/60">Guests</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-white/30" />
                        <input 
                            type="number"
                            min="1"
                            max="20"
                            {...form.register("guests", { valueAsNumber: true })}
                            className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 bg-primary text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 rounded-sm mt-4 flex items-center justify-center gap-2"
            >
                {mutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Reservation"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
