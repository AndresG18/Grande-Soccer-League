import './Home.css';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => {
      section.classList.add('hidden');
      observer.observe(section);
    });
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <section className="hero">
          <h2>Welcome to Grande Futsal</h2>
          <p>Experience the best indoor futsal for young players and growth.</p>
          <p>Registration Price: $130</p>
          <OpenModalButton
            buttonText="Register Now"
            modalComponent={<SignupFormModal />}
          />
        </section>

        <section id="registration" className="registration">
          <h2>Registration Steps</h2>
          <ol>
            <li>1. Register an account</li>
            <li>2. Sign the waiver you are redirected to after signing up</li>
            <li>3. Log in to your account and pay the registration fee</li>
          </ol>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>Indoor futsal offers a comfortable and cool environment, perfect for both kids to play and parents to watch.</p>
        </section>

        <section id="age-groups" className="age-groups">
          <h2>Age Groups</h2>
          <ul>
            <li>6-8 Years</li>
            <li>9-10 Years</li>
            <li>11-12 Years</li>
          </ul>
        </section>

        <section id="why-choose" className="why-choose">
          <h2>Why Choose Indoor Futsal?</h2>
          <ul>
            <li>Comfortable and Safe Environment: Enjoy futsal in an air-conditioned indoor setting, keeping everyone comfortable and safe from extreme conditions.</li>
            <li>Parental Convenience: Parents can watch their children play in a secure, indoor environment, without the worry of weather conditions.</li>
            <li>Skill Enhancement: Our program is designed to help kids develop their soccer skills, learn teamwork, and build confidence.</li>
            <li>Fun and Engaging: Indoor futsal is an exciting way for kids to stay active, make friends, and enjoy.</li>
            <li>Professional Coaching: Our experienced coaches are dedicated to teaching the fundamentals of futsal and soccer, ensuring your child receives top-notch training.</li>
          </ul>
        </section>

        <section id="program-highlights" className="program-highlights">
          <h2>Program Highlights</h2>
          <ul>
            <li>5 v 5 Games: Our games are structured as 5 vs. 5, ensuring each child gets plenty of playtime and engagement.</li>
            <li>Structured Training Sessions: Each session is carefully planned to maximize skill development and enjoyment.</li>
            <li>Small Team Sizes: Small teams ensure each child gets ample playing time and personalized attention from coaches.</li>
            <li>Competitive Matches: Kids will have the opportunity to participate in matches and tournaments, putting their skills to the test.</li>
          </ul>
        </section>

        <section id="policy" className="policy">
          <h2>Policy</h2>
          <li>No Tolerance for Bullying: We have a strict policy against bullying referees and players.</li>
          <li>Parents must remain respectful physically and verbally. If any staff notices parents who are not obeying building and league policy, they will be asked to leave. If they refuse, they will be banned from the program, including the child.</li>
          <li>No refund policy when paying with credit card.</li>
        </section>

        <footer className="home-footer">
          <p>Contact us: info@grandefutsal.com</p>
          <div className="social-media-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </footer>
      </div>
    </div>
  );
}